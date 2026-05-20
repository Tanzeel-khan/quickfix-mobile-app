import React, { useState, useRef, useCallback } from 'react';
import Config from 'react-native-config';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import { requestsApi, bookingsApi } from '../../lib/api';
import { Colors, Spacing, Radius } from '../../theme';
import type {
  ServiceRequest,
  IntentData,
  ClarificationData,
  Candidate,
  Language,
} from '../../types';
import { ProviderRankCard } from '../../components/chat/ProviderRankCard';
import { ReasoningPanel } from '../../components/chat/ReasoningPanel';
import { PriceQuoteCard } from '../../components/chat/PriceQuoteCard';
import { BookingConfirmCard } from '../../components/chat/BookingConfirmCard';
import type { RootStackParams } from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParams>;

// ── Message types ─────────────────────────────────────
type ChatMsg =
  | { id: string; type: 'agent' | 'user'; text: string }
  | { id: string; type: 'typing' }
  | { id: string; type: 'intent_card'; requestId: string; intent: IntentData; candidates: Candidate[] }
  | { id: string; type: 'clarification_card'; requestId: string; data: ClarificationData }
  | { id: string; type: 'providers_card'; requestId: string; candidates: Candidate[]; intent: IntentData }
  | { id: string; type: 'reasoning_panel'; candidate: Candidate }
  | { id: string; type: 'price_quote_card'; requestId: string; candidate: Candidate; intent: IntentData }
  | { id: string; type: 'booking_confirm_card'; booking: any };

const QUICK_CHIPS = ['AC not cooling', 'Water leak', 'Noise issue', 'Not starting'];

const GREETING = "Hi! I'm Quickfix. What do you need fixed? You can type in any language — even mix them.";

// ── Sub-components ────────────────────────────────────

function AgentBubble({ text }: { text: string }) {
  return (
    <View style={styles.agentRow}>
      <View style={styles.agentAvatar}>
        <Text style={styles.agentAvatarText}>Q</Text>
      </View>
      <View style={styles.agentBubble}>
        <Text style={styles.agentText}>{text}</Text>
      </View>
    </View>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <View style={styles.userRow}>
      <View style={styles.userBubble}>
        <Text style={styles.userText}>{text}</Text>
      </View>
    </View>
  );
}

function TypingIndicator() {
  return (
    <View style={styles.agentRow}>
      <View style={styles.agentAvatar}>
        <Text style={styles.agentAvatarText}>Q</Text>
      </View>
      <View style={styles.agentBubble}>
        <Text style={styles.typingText}>agent · parsing intent…</Text>
      </View>
    </View>
  );
}

// ── Intent Confirm Card (Screen 03) ──────────────────
function IntentCard({
  requestId,
  intent,
  candidates,
  onFindProviders,
}: {
  requestId: string;
  intent: IntentData;
  candidates: Candidate[];
  onFindProviders: (requestId: string, candidates: Candidate[], intent: IntentData) => void;
}) {
  const pct = Math.round(intent.confidence * 100);
  const fields = [
    { icon: '🔧', label: 'SERVICE', value: intent.service, chip: intent.severity },
    { icon: '📍', label: 'LOCATION', value: intent.location, chip: null },
    { icon: '🕐', label: 'WHEN', value: intent.when?.label ?? '—', chip: null, note: intent.when?.start },
    { icon: '💰', label: 'BUDGET', value: intent.budget?.max ? `Up to Rs. ${intent.budget.max.toLocaleString()}` : '—', chip: intent.budget?.priceSensitive ? 'price-sensitive' : null },
    { icon: '⚡', label: 'URGENCY', value: intent.urgency, chip: null },
  ];

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Here's what I understood</Text>
        <Text style={styles.cardSub}>Tap any line to edit</Text>
      </View>

      {/* Confidence badge */}
      <View style={[styles.badge, { backgroundColor: '#E8F5E9' }]}>
        <Text style={[styles.badgeDot, { color: Colors.success }]}>●</Text>
        <Text style={[styles.badgeText, { color: Colors.success }]}>
          Confidence {pct}% · {intent.fieldsExtracted ?? fields.length} fields extracted
        </Text>
      </View>

      {/* Fields */}
      {fields.map((f) => (
        <View key={f.label} style={styles.intentRow}>
          <Text style={styles.intentIcon}>{f.icon}</Text>
          <View style={styles.intentContent}>
            <Text style={styles.intentLabel}>{f.label}</Text>
            <Text style={styles.intentValue}>{f.value}</Text>
            {f.note && <Text style={styles.intentNote}>{f.note}</Text>}
            {f.chip && (
              <View style={styles.chipWrap}>
                <Text style={styles.chip}>{f.chip}</Text>
              </View>
            )}
          </View>
          <Text style={styles.editIcon}>✏️</Text>
        </View>
      ))}

      {/* Parsed from */}
      {intent.parsedFrom && (
        <View style={styles.parsedBox}>
          <Text style={styles.parsedLabel}>How I parsed this:</Text>
          <Text style={styles.parsedText}>{intent.parsedFrom}</Text>
        </View>
      )}

      {/* Actions */}
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.primaryCardBtn}
          onPress={() => onFindProviders(requestId, candidates, intent)}
        >
          <Text style={styles.primaryCardBtnText}>Find providers →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ── Clarification Card (Screen 04) ───────────────────
function ClarificationCard({
  requestId,
  data,
  onSubmit,
}: {
  requestId: string;
  data: ClarificationData;
  onSubmit: (requestId: string, answers: Record<string, string>) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const pct = Math.round(data.confidence * 100);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={[styles.badge, { backgroundColor: '#FFF8E1' }]}>
        <Text style={[styles.badgeDot, { color: Colors.warning }]}>⚠</Text>
        <Text style={[styles.badgeText, { color: '#856404' }]}>
          Confidence {pct}% · {data.ambiguities} ambiguit{data.ambiguities === 1 ? 'y' : 'ies'}
        </Text>
      </View>

      <View style={[styles.badge, { backgroundColor: '#F3F4F6', marginTop: 8 }]}>
        <Text style={[styles.badgeText, { color: Colors.text }]}>✦ AGENT · CLARIFY</Text>
      </View>

      <Text style={styles.clarifyQuestion}>{data.summary}</Text>

      {data.questions.map((q) => (
        <View key={q.key} style={styles.qBlock}>
          <Text style={styles.qLabel}>{q.label}</Text>
          {q.type === 'choice' && q.options ? (
            <View style={styles.optionRow}>
              {q.options.map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.optionBtn,
                    answers[q.key] === opt && styles.optionBtnActive,
                  ]}
                  onPress={() => setAnswers((a) => ({ ...a, [q.key]: opt }))}
                >
                  <Text
                    style={[
                      styles.optionText,
                      answers[q.key] === opt && styles.optionTextActive,
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <TextInput
              style={styles.clarifyInput}
              placeholder={q.placeholder ?? 'Type your answer…'}
              placeholderTextColor={Colors.muted}
              value={answers[q.key] ?? ''}
              onChangeText={(v) => setAnswers((a) => ({ ...a, [q.key]: v }))}
            />
          )}
        </View>
      ))}

      <TouchableOpacity
        style={styles.primaryCardBtn}
        onPress={() => onSubmit(requestId, answers)}
      >
        <Text style={styles.primaryCardBtnText}>Confirm and continue →</Text>
      </TouchableOpacity>

      {data.agentTrace && (
        <View style={styles.traceBox}>
          <Text style={styles.traceText}>{data.agentTrace}</Text>
        </View>
      )}
    </View>
  );
}


// ── Main ChatScreen ───────────────────────────────────
export function ChatScreen() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<Nav>();
  const user = useAuthStore((s) => s.user);

  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: '0',
      type: 'agent',
      text: `Hi ${user?.name ?? 'there'}! ${GREETING}`,
    },
    {
      id: 'mock-1',
      type: 'user',
      text: 'AC theek karwana hai F-10 mein kal subah',
    },
    {
      id: 'mock-2',
      type: 'providers_card',
      requestId: 'mock-req-123',
      candidates: [
        {
          id: '1',
          name: 'Ali Khan AC Services',
          score: 92,
          rating: 4.8,
          reviews: 142,
          distanceKm: 2.7,
          etaMin: 24,
          priceEstimate: 3200,
          specialization: 'Inverter Specialist',
          yearsExp: 8,
        },
        {
          id: '2',
          name: 'Bilal AC Repair',
          score: 84,
          rating: 4.6,
          reviews: 85,
          distanceKm: 2.3,
          etaMin: 21,
          priceEstimate: 3400,
          specialization: 'Generalist',
        },
      ],
      intent: {
        service: 'AC repair',
        location: 'F-10, Islamabad',
        urgency: 'Normal',
        confidence: 0.95,
        fieldsExtracted: 4,
        budget: { max: 4000, currency: 'PKR', priceSensitive: true },
        when: { label: 'Tomorrow morning' },
      },
    },
  ]);
  const [input, setInput] = useState('');
  const [processing, setProcessing] = useState(false);
  const listRef = useRef<FlatList>(null);

  const currentLang = (i18n.language as Language) ?? 'en';

  const addMsg = useCallback((msg: ChatMsg) => {
    setMessages((prev) => [...prev, msg]);
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  }, []);

  // ── Handle API response ─────────────────────────────
  const handleRequestResponse = useCallback(
    (res: ServiceRequest) => {
      setProcessing(false);
      // Remove typing indicator
      setMessages((prev) => prev.filter((m) => m.type !== 'typing'));

      if (res.status === 'clarifying' && res.clarification) {
        addMsg({
          id: Date.now().toString(),
          type: 'clarification_card',
          requestId: res.id,
          data: res.clarification,
        });
      } else if ((res.status === 'ready') && res.intent) {
        addMsg({
          id: Date.now().toString(),
          type: 'intent_card',
          requestId: res.id,
          intent: res.intent,
          candidates: res.candidates ?? [],
        });
      } else {
        addMsg({
          id: Date.now().toString(),
          type: 'agent',
          text: "I've processed your request. Let me know if you'd like to continue.",
        });
      }
    },
    [addMsg],
  );

  // ── Send message ────────────────────────────────────
  const send = useCallback(
    async (text: string) => {
      if (!text.trim() || processing) return;
      setInput('');
      addMsg({ id: Date.now().toString(), type: 'user', text });
      setProcessing(true);
      addMsg({ id: 'typing', type: 'typing' });

      try {
        const { data } = await requestsApi.create(text, currentLang);
        handleRequestResponse(data);
      } catch (err: unknown) {
        setProcessing(false);
        setMessages((prev) => prev.filter((m) => m.type !== 'typing'));
        const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
        addMsg({ id: Date.now().toString(), type: 'agent', text: msg });
      }
    },
    [processing, currentLang, addMsg, handleRequestResponse],
  );

  // ── Clarify ─────────────────────────────────────────
  const handleClarify = useCallback(
    async (requestId: string, answers: Record<string, string>) => {
      setProcessing(true);
      addMsg({ id: 'typing', type: 'typing' });
      try {
        const { data } = await requestsApi.clarify(requestId, answers);
        handleRequestResponse(data);
      } catch {
        setProcessing(false);
        setMessages((prev) => prev.filter((m) => m.type !== 'typing'));
        addMsg({ id: Date.now().toString(), type: 'agent', text: 'Could not process your answers. Please try again.' });
      }
    },
    [addMsg, handleRequestResponse],
  );

  // ── Show providers ───────────────────────────────────
  const handleFindProviders = useCallback(
    (requestId: string, candidates: Candidate[], intent: IntentData) => {
      if (!candidates.length) {
        addMsg({ id: Date.now().toString(), type: 'agent', text: 'No providers found in your area right now.' });
        return;
      }
      addMsg({
        id: Date.now().toString(),
        type: 'providers_card',
        requestId,
        candidates,
        intent,
      });
    },
    [addMsg],
  );

  // ── Book provider ────────────────────────────────────
  const handleSelectProvider = useCallback(
    async (requestId: string, candidate: Candidate, intent: IntentData) => {
      addMsg({
        id: Date.now().toString(),
        type: 'price_quote_card',
        requestId,
        candidate,
        intent,
      });
    },
    [addMsg],
  );

  // ── Final Booking ───────────────────────────────────
  const handleFinalBook = useCallback(
    async (requestId: string, candidate: Candidate, intent: IntentData) => {
      setProcessing(true);
      addMsg({ id: 'typing', type: 'typing' });
      try {
        let bookingData;
        const isDemo = Config.DEMO_MODE !== 'false'; // Default to demo if not explicitly false
        
        if (isDemo) {
          // Simulated delay
          await new Promise(resolve => setTimeout(() => resolve(null), 1200));
          bookingData = {
            id: 'BK-' + Math.floor(Math.random() * 10000),
            status: 'confirmed',
            provider: candidate,
            scheduledAt: intent?.when?.label ?? 'Today',
            totalPrice: candidate.priceEstimate || 3200,
            address: intent?.location || 'F-10, Islamabad',
            service: intent?.service || 'AC Repair',
            whatsappPayload: {
              target: candidate.name,
              message: `Hi, a new booking has been confirmed for ${intent?.when?.label || 'tomorrow'}.`,
            }
          };
        } else {
          const { data } = await bookingsApi.create({
            requestId,
            providerId: candidate.id,
            ...(intent.when?.start ? { scheduledAt: intent.when.start } : {}),
          });
          bookingData = data;
        }

        setProcessing(false);
        setMessages((prev) => prev.filter((m) => m.type !== 'typing'));
        navigation.navigate('BookingSuccess', { booking: bookingData });
      } catch (err: any) {
        console.error('[Booking Error]', err);
        setProcessing(false);
        setMessages((prev) => prev.filter((m) => m.type !== 'typing'));
        const errorMessage = err?.message || 'Something went wrong';
        addMsg({ 
          id: Date.now().toString(), 
          type: 'agent', 
          text: `Booking failed: ${errorMessage}. (Using DEMO_MODE=${Config.DEMO_MODE})` 
        });
      }
    },
    [addMsg],
  );

  // ── Show Reasoning ──────────────────────────────────
  const handleShowReasoning = useCallback(
    (candidate: Candidate) => {
      addMsg({
        id: Date.now().toString(),
        type: 'reasoning_panel',
        candidate,
      });
    },
    [addMsg],
  );

  // ── Render message ───────────────────────────────────
  const renderItem = useCallback(
    ({ item }: { item: ChatMsg }) => {
      switch (item.type) {
        case 'agent':
          return <AgentBubble text={item.text} />;
        case 'user':
          return <UserBubble text={item.text} />;
        case 'typing':
          return <TypingIndicator />;
        case 'intent_card':
          return (
            <IntentCard
              requestId={item.requestId}
              intent={item.intent}
              candidates={item.candidates}
              onFindProviders={handleFindProviders}
            />
          );
        case 'clarification_card':
          return (
            <ClarificationCard
              requestId={item.requestId}
              data={item.data}
              onSubmit={handleClarify}
            />
          );
        case 'providers_card':
          return (
            <ProviderRankCard
              requestId={item.requestId}
              candidates={item.candidates}
              intent={item.intent}
              onSelect={handleSelectProvider}
              onShowReasoning={handleShowReasoning}
            />
          );
        case 'reasoning_panel':
          return (
            <ReasoningPanel
              candidate={item.candidate}
              onContinue={(c) => {
                // Find matching intent from msg history or state
                const prev = messages.find(m => m.type === 'providers_card') as any;
                if (prev) handleSelectProvider(prev.requestId, c, prev.intent);
              }}
              onClose={() => {}}
            />
          );
        case 'price_quote_card':
          return (
            <PriceQuoteCard
              candidate={item.candidate}
              budgetCap={item.intent.budget.max}
              onBook={() => handleFinalBook(item.requestId, item.candidate, item.intent)}
            />
          );
        case 'booking_confirm_card':
          return (
            <BookingConfirmCard
              booking={item.booking}
              onTrack={() => navigation.navigate('ActiveBooking', { bookingId: item.booking.id })}
            />
          );
        default:
          return null;
      }
    },
    [handleFindProviders, handleClarify, handleSelectProvider],
  );

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={88}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>New request</Text>
          <Text style={styles.headerSub}>Quickfix Agent · online</Text>
        </View>
        <TouchableOpacity style={styles.globeBtn}>
          <Text style={styles.globeIcon}>🌐</Text>
        </TouchableOpacity>
      </View>

      {/* Message list */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(m) => m.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
      />

      {/* Quick chips */}
      {messages.length <= 1 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsScroll}
          contentContainerStyle={styles.chips}
        >
          {QUICK_CHIPS.map((c) => (
            <TouchableOpacity key={c} style={styles.chipBtn} onPress={() => send(c)}>
              <Text style={styles.chipBtnText}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Input bar */}
      <View style={styles.inputBar}>
        <TouchableOpacity style={styles.plusBtn}>
          <Text style={styles.plusIcon}>+</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder={t('chat.placeholder')}
          placeholderTextColor={Colors.muted}
          value={input}
          onChangeText={setInput}
          multiline
          onSubmitEditing={() => send(input)}
          returnKeyType="send"
        />
        {processing ? (
          <ActivityIndicator color={Colors.primary} style={styles.micBtn} />
        ) : (
          <TouchableOpacity
            style={[styles.micBtn, input.trim() && styles.micBtnActive]}
            onPress={() => send(input)}
          >
            <Text style={styles.micIcon}>{input.trim() ? '↑' : '🎤'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

// ── Styles ────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: Colors.text },
  headerSub: { fontSize: 12, color: Colors.success, marginTop: 1 },
  globeBtn: { padding: 6 },
  globeIcon: { fontSize: 20 },

  // Message list
  list: { padding: Spacing.md, paddingBottom: Spacing.lg },

  // Agent bubble
  agentRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 12, maxWidth: '85%' },
  agentAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  agentAvatarText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  agentBubble: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.bubble,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  agentText: { color: Colors.text, fontSize: 14, lineHeight: 20 },
  typingText: { color: Colors.muted, fontSize: 13, fontStyle: 'italic' },

  // User bubble
  userRow: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 12 },
  userBubble: {
    backgroundColor: Colors.text,
    borderRadius: Radius.bubble,
    borderBottomRightRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: '75%',
  },
  userText: { color: '#fff', fontSize: 14, lineHeight: 20 },

  // Card shared
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.card,
    padding: Spacing.md,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: { marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: Colors.text },
  cardSub: { fontSize: 12, color: Colors.muted, marginTop: 2 },

  // Badge
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.sm,
    marginBottom: 12,
    gap: 5,
  },
  badgeDot: { fontSize: 12 },
  badgeText: { fontSize: 12, fontWeight: '600' },

  // Intent card
  intentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 10,
  },
  intentIcon: { fontSize: 16, width: 24, textAlign: 'center' },
  intentContent: { flex: 1 },
  intentLabel: { fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 0.8, marginBottom: 2 },
  intentValue: { fontSize: 14, fontWeight: '500', color: Colors.text },
  intentNote: { fontSize: 12, color: '#F4813A', marginTop: 2 },
  chipWrap: { marginTop: 4 },
  chip: {
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  editIcon: { fontSize: 14, opacity: 0.4 },

  parsedBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: Radius.sm,
    padding: 10,
    marginTop: 12,
  },
  parsedLabel: { fontSize: 11, fontWeight: '700', color: Colors.muted, marginBottom: 3 },
  parsedText: { fontSize: 12, color: Colors.text, lineHeight: 17 },

  // Card action buttons
  cardActions: { flexDirection: 'row', gap: 10, marginTop: 16 },
  editBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: Radius.sm,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  editBtnText: { fontSize: 15, fontWeight: '600', color: Colors.text },
  primaryCardBtn: {
    flex: 2,
    backgroundColor: Colors.text,
    borderRadius: Radius.sm,
    paddingVertical: 13,
    alignItems: 'center',
  },
  primaryCardBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },

  // Clarification
  clarifyQuestion: { fontSize: 14, color: Colors.text, lineHeight: 21, marginBottom: 14 },
  qBlock: { marginBottom: 14 },
  qLabel: { fontSize: 12, color: Colors.muted, fontWeight: '600', marginBottom: 6 },
  optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    backgroundColor: Colors.surface,
  },
  optionBtnActive: { backgroundColor: Colors.text, borderColor: Colors.text },
  optionText: { fontSize: 13, fontWeight: '600', color: Colors.text },
  optionTextActive: { color: '#fff' },
  clarifyInput: {
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: Radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 14,
    color: Colors.text,
  },
  traceBox: {
    marginTop: 12,
    backgroundColor: '#1E1E1E',
    borderRadius: Radius.sm,
    padding: 10,
  },
  traceText: { color: '#A0A0A0', fontSize: 11, fontFamily: 'monospace', lineHeight: 16 },

  // Providers card
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 10,
  },
  providerRowTop: { borderTopWidth: 0 },
  bestMatchBadge: {
    position: 'absolute',
    top: 8,
    right: 80,
    backgroundColor: Colors.danger,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 1,
  },
  bestMatchText: { color: '#fff', fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  providerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerAvatarText: { fontSize: 16, fontWeight: '700', color: Colors.primary },
  providerInfo: { flex: 1 },
  providerName: { fontSize: 14, fontWeight: '700', color: Colors.text },
  providerMeta: { fontSize: 12, color: Colors.muted, marginTop: 1 },
  providerSpec: { fontSize: 11, fontWeight: '600', color: Colors.primary, marginTop: 2, textTransform: 'uppercase' },
  providerStats: { flexDirection: 'row', gap: 10, marginTop: 4 },
  statItem: { fontSize: 12, color: Colors.text, fontWeight: '500' },
  providerRight: { alignItems: 'center', gap: 6 },
  matchScore: { fontSize: 20, fontWeight: '800', color: Colors.text },
  selectBtn: {
    backgroundColor: '#D94027',
    borderRadius: Radius.sm,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  selectBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  viewBtn: {
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: Radius.sm,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  viewBtnText: { color: Colors.text, fontSize: 13, fontWeight: '600' },

  // Quick chips
  chipsScroll: { flexShrink: 0 },
  chips: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    gap: 8,
  },
  chipBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    backgroundColor: Colors.surface,
  },
  chipBtnText: { fontSize: 13, color: Colors.text, fontWeight: '500' },

  // Input bar
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 8,
  },
  plusBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: { fontSize: 20, color: Colors.muted, lineHeight: 22 },
  textInput: {
    flex: 1,
    minHeight: 36,
    maxHeight: 100,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 14,
    color: Colors.text,
    backgroundColor: Colors.background,
  },
  micBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micBtnActive: { backgroundColor: Colors.primary },
  micIcon: { fontSize: 16 },
});
