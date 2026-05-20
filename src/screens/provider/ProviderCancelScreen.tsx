import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Platform } from 'react-native';
import { Colors, Spacing, Radius, Fonts } from '../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const REASONS = [
  { id: '1', label: 'Family emergency', sub: 'No penalty · 1x per month allowed', icon: 'account-alert-outline' },
  { id: '2', label: 'Vehicle breakdown', sub: 'Light penalty', icon: 'car-off' },
  { id: '3', label: 'Sick / unwell', sub: 'No penalty with proof', icon: 'emoticon-sick-outline' },
  { id: '4', label: 'Double-booked', sub: 'Reliability impact', icon: 'calendar-clock' },
  { id: '5', label: 'Customer unresponsive', sub: 'Investigated separately', icon: 'account-question-outline' },
  { id: '6', label: 'Other', sub: '', icon: 'pencil-outline' },
];

export function ProviderCancelScreen({ route, navigation }: any) {
  const { bookingId } = route.params || { bookingId: 'QF-2086' };
  const [selectedReason, setSelectedReason] = useState('1');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
           <Icon name="chevron-left" size={32} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Cancel job</Text>
          <Text style={styles.headerSub}>{bookingId} · Hassan Iqbal</Text>
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.warningBox}>
           <Text style={styles.warningIcon}>⚠️</Text>
           <Text style={styles.warningText}>
             Cancelling within 2 hours of start time impacts your reliability score. Quickfix will <Text style={styles.bold}>auto-reschedule the customer</Text> in seconds.
           </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>REASON</Text>
          {REASONS.map(reason => (
            <TouchableOpacity 
              key={reason.id} 
              style={[styles.reasonItem, selectedReason === reason.id && styles.reasonActive]}
              onPress={() => setSelectedReason(reason.id)}
            >
              <View style={styles.reasonLeft}>
                 <Icon name={reason.icon as any} size={20} color={selectedReason === reason.id ? '#D94027' : Colors.muted} />
                 <View style={styles.flex1}>
                    <Text style={styles.reasonLabel}>{reason.label}</Text>
                    {reason.sub ? <Text style={styles.reasonSub}>{reason.sub}</Text> : null}
                 </View>
              </View>
              <View style={[styles.radio, selectedReason === reason.id && styles.radioActive]}>
                 {selectedReason === reason.id && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>OPTIONAL NOTE TO CUSTOMER</Text>
          <View style={styles.textareaWrapper}>
            <TextInput 
              style={styles.textarea}
              placeholder="A short message helps preserve trust..."
              multiline
            />
            <Icon name="microphone" size={20} color={Colors.muted} style={styles.mic} />
          </View>
        </View>

        <View style={styles.section}>
           <Text style={styles.sectionTitle}>WHAT HAPPENS NEXT</Text>
           <View style={styles.nextBox}>
              <View style={styles.step}>
                 <Text style={styles.stepNum}>1.</Text>
                 <Text style={styles.stepText}>Booking marked <Text style={styles.mono}>cancelled_by_provider</Text></Text>
              </View>
              <View style={styles.step}>
                 <Text style={styles.stepNum}>2.</Text>
                 <Text style={styles.stepText}><Text style={styles.mono}>reschedule_agent</Text> picks next-best provider</Text>
              </View>
              <View style={styles.step}>
                 <Text style={styles.stepNum}>3.</Text>
                 <Text style={styles.stepText}>Customer offered new slot (3-5 sec)</Text>
              </View>
              <View style={styles.step}>
                 <Text style={styles.stepNum}>4.</Text>
                 <Text style={styles.stepText}>Your reliability score: <Text style={styles.impact}>-0 (no penalty)</Text></Text>
              </View>
           </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
         <TouchableOpacity style={styles.confirmBtn} onPress={() => navigation.navigate('ProviderTabs')}>
            <Text style={styles.confirmText}>Confirm cancellation</Text>
         </TouchableOpacity>
      </View>
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
  container: {
    flex: 1,
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF1F0',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD8D6',
    gap: 12,
  },
  warningIcon: {
    fontSize: 18,
  },
  warningText: {
    fontSize: 12,
    color: '#D94027',
    flex: 1,
    lineHeight: 18,
  },
  bold: {
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.muted,
    letterSpacing: 1,
    marginBottom: 16,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 12,
    marginBottom: 8,
  },
  reasonActive: {
    borderColor: '#D94027',
    backgroundColor: '#FFF2F0',
  },
  reasonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  reasonLabel: {
    fontSize: 14,
    fontFamily: Fonts.latin.medium,
    color: Colors.text,
  },
  reasonSub: {
    fontSize: 11,
    color: Colors.muted,
    marginTop: 2,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: '#D94027',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D94027',
  },
  textareaWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    minHeight: 100,
  },
  textarea: {
    flex: 1,
    fontSize: 14,
    textAlignVertical: 'top',
    paddingVertical: 12,
  },
  mic: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  nextBox: {
    backgroundColor: '#1E1B18',
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  step: {
    flexDirection: 'row',
    gap: 12,
  },
  stepNum: {
    fontSize: 13,
    color: '#D94027',
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 13,
    color: '#FFFFFF',
    flex: 1,
  },
  mono: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: 'rgba(255,255,255,0.6)',
  },
  impact: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  confirmBtn: {
    backgroundColor: Colors.text,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
