import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Colors, Spacing, Radius, Fonts } from '../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function ProviderDisputeResponseScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
           <Icon name="chevron-left" size={32} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Dispute · QF-2086</Text>
          <Text style={styles.headerSub}>Action required</Text>
        </View>
        <View style={styles.timerBadge}>
           <Text style={styles.timerText}>2 hr left</Text>
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Customer Claim */}
        <View style={styles.claimCard}>
           <View style={styles.claimHeader}>
              <View style={styles.avatar}>
                 <Text style={styles.avatarText}>H</Text>
              </View>
              <View style={styles.flex1}>
                 <Text style={styles.claimantName}>Hassan Iqbal claims</Text>
                 <Text style={styles.claimTime}>Filed 3 hr 14 min ago</Text>
              </View>
              <View style={styles.claimBadge}>
                 <Text style={styles.claimBadgeText}>Incomplete</Text>
              </View>
           </View>
           <View style={styles.claimQuote}>
              <Text style={styles.quoteText}>
                "AC stopped cooling again 2 hours after technician left. Same issue as before. Need this fixed."
              </Text>
           </View>
        </View>

        {/* AI Agent Recommendation */}
        <View style={styles.aiCard}>
           <Text style={styles.sectionLabel}>AGENT RECOMMENDATION</Text>
           <View style={styles.agentHeader}>
              <Icon name="robot-outline" size={20} color="#D94027" />
              <Text style={styles.agentName}>DISPUTE AGENT · 84% CONFIDENCE</Text>
           </View>
           <Text style={styles.agentAnalysis}>
             Looks like a warranty rework. Cooling lasted {'<'} 4 hours which falls inside the 7-day workmanship window.
           </Text>
           
           <View style={styles.optionList}>
              <View style={[styles.option, styles.optionRecommended]}>
                 <View style={styles.optionCheck}>
                    <Icon name="check" size={14} color="#FFF" />
                 </View>
                 <Text style={styles.optionText}>Free rework visit by you</Text>
                 <Text style={styles.optionBadge}>Recommended</Text>
              </View>
              <View style={styles.option}>
                 <View style={styles.optionDot} />
                 <Text style={styles.optionText}>Partial refund · Rs. 500</Text>
                 <Text style={styles.optionBadgeMuted}>Backup</Text>
              </View>
              <View style={styles.option}>
                 <View style={styles.optionDot} />
                 <Text style={styles.optionText}>Reassign to another tech</Text>
                 <Text style={styles.optionBadgeMuted}>Customer option</Text>
              </View>
           </View>

           <View style={styles.traceBox}>
              <Text style={styles.traceText}>
                dispute_agent = similar_cases(rework_within_24h, n=14)
                policy: workmanship_window=7d · no_payout_hold
              </Text>
           </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
           <Text style={styles.sectionTitle}>YOUR RESPONSE</Text>
           
           <TouchableOpacity style={styles.primaryAction}>
              <View style={styles.actionIconBox}>
                 <Icon name="calendar-refresh" size={24} color="#FFF" />
              </View>
              <View style={styles.flex1}>
                 <Text style={styles.actionTitle}>Schedule free rework</Text>
                 <Text style={styles.actionSub}>Visit Hassan again at no cost</Text>
              </View>
              <Icon name="chevron-right" size={20} color="rgba(255,255,255,0.4)" />
           </TouchableOpacity>

           <TouchableOpacity style={styles.secondaryAction}>
              <View style={styles.actionIconBoxMuted}>
                 <Icon name="cash-refund" size={24} color={Colors.text} />
              </View>
              <View style={styles.flex1}>
                 <Text style={styles.actionTitleMuted}>Offer Rs. 500 refund</Text>
                 <Text style={styles.actionSubMuted}>Close dispute · keep rating</Text>
              </View>
              <Icon name="chevron-right" size={20} color={Colors.muted} />
           </TouchableOpacity>

           <TouchableOpacity style={styles.secondaryAction}>
              <View style={styles.actionIconBoxMuted}>
                 <Text style={styles.redIcon}>P</Text>
              </View>
              <View style={styles.flex1}>
                 <Text style={styles.actionTitleMuted}>Dispute customer claim</Text>
                 <Text style={styles.actionSubMuted}>Escalate to human review</Text>
              </View>
              <Icon name="chevron-right" size={20} color={Colors.muted} />
           </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.latin.bold,
    color: Colors.text,
  },
  headerSub: {
    fontSize: 12,
    color: Colors.muted,
  },
  timerBadge: {
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  timerText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#E65100',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  claimCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 2 },
    }),
  },
  claimHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.muted,
  },
  flex1: {
    flex: 1,
  },
  claimantName: {
    fontSize: 14,
    fontFamily: Fonts.latin.bold,
    color: Colors.text,
  },
  claimTime: {
    fontSize: 11,
    color: Colors.muted,
  },
  claimBadge: {
    backgroundColor: '#FFF1F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  claimBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#D94027',
  },
  claimQuote: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#E0E0E0',
  },
  quoteText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: Colors.text,
    lineHeight: 20,
  },
  aiCard: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D94027',
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: Colors.muted,
    letterSpacing: 1,
    marginBottom: 16,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  agentName: {
    fontSize: 11,
    fontWeight: '800',
    color: '#D94027',
    letterSpacing: 0.5,
  },
  agentAnalysis: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: 20,
  },
  optionList: {
    gap: 12,
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  optionRecommended: {
    backgroundColor: '#F1F8F3',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  optionCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginLeft: 4,
  },
  optionText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  optionBadge: {
    fontSize: 9,
    fontWeight: '800',
    color: '#2E7D32',
    backgroundColor: '#C8E6C9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  optionBadgeMuted: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.muted,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  traceBox: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  traceText: {
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: Colors.muted,
    lineHeight: 16,
  },
  actionSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.muted,
    letterSpacing: 1,
    marginBottom: 8,
  },
  primaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1B18',
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },
  actionIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(217, 64, 39, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: {
    fontSize: 15,
    fontFamily: Fonts.latin.bold,
    color: '#FFFFFF',
  },
  actionSub: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
  },
  secondaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    gap: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  actionIconBoxMuted: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitleMuted: {
    fontSize: 15,
    fontFamily: Fonts.latin.bold,
    color: Colors.text,
  },
  actionSubMuted: {
    fontSize: 11,
    color: Colors.muted,
  },
  redIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D94027',
  },
});
