import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, Dimensions } from 'react-native';
import { Colors, Spacing, Radius, Fonts } from '../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export function ProviderCompleteScreen({ navigation }: any) {
  const evidence = [
    { id: '1', label: 'BEFORE - 28°C', sub: 'AC not cooling', done: true },
    { id: '2', label: 'AFTER - 22°C', sub: 'Stable for 30 min', done: true },
    { id: '3', label: 'CAPACITOR - old', sub: 'Replaced', done: true },
    { id: '4', label: 'INVOICE', sub: 'Cash receipt', done: true },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Complete Job</Text>
          <Text style={styles.headerSub}>QF-2086 · Hassan Iqbal</Text>
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.timerRow}>
          <View style={styles.timerBox}>
             <Text style={styles.timerLabel}>ELAPSED</Text>
             <Text style={styles.timerValue}>2:14:30</Text>
          </View>
          <View style={styles.timerBox}>
             <Text style={styles.timerLabel}>ESTIMATED</Text>
             <Text style={styles.timerValue}>2:30</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EVIDENCE</Text>
          <View style={styles.evidenceGrid}>
            {evidence.map(item => (
              <TouchableOpacity key={item.id} style={styles.evidenceCard}>
                 <View style={styles.evidenceHeader}>
                    <Text style={styles.evidenceLabel}>{item.label}</Text>
                    <View style={styles.checkIcon}>
                       <Icon name="check-circle" size={16} color="#4CAF50" />
                    </View>
                 </View>
                 <View style={styles.photoPlaceholder}>
                    <Icon name="image-outline" size={24} color="#CCC" />
                 </View>
                 <Text style={styles.evidenceSub}>{item.sub}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FINAL AMOUNT</Text>
          <View style={styles.amountCard}>
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Quoted</Text>
              <Text style={styles.amountValue}>Rs. 3,200</Text>
            </View>
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Capacitor cost (parts)</Text>
              <Text style={styles.amountValue}>+ Rs. 60</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.amountRow}>
              <Text style={styles.finalLabel}>Final</Text>
              <Text style={styles.finalValue}>Rs. 3,260</Text>
            </View>
          </View>

          <View style={styles.approvalBox}>
             <Icon name="information-outline" size={14} color="#E65100" />
             <Text style={styles.approvalText}>
               Customer notified of Rs. 60 over-quote. Awaiting auto-approval (parts under 5%).
             </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
         <TouchableOpacity style={styles.addPhotoBtn}>
            <Icon name="camera-plus-outline" size={20} color={Colors.text} />
            <Text style={styles.addPhotoText}>Add photo</Text>
         </TouchableOpacity>
         <TouchableOpacity 
           style={styles.completeBtn}
           onPress={() => navigation.navigate('ProviderTabs')}
          >
            <Text style={styles.completeText}>Mark complete ✓</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: Colors.text,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: Fonts.latin.bold,
    color: Colors.text,
  },
  headerSub: {
    fontSize: 11,
    color: Colors.muted,
  },
  container: {
    flex: 1,
  },
  timerRow: {
    flexDirection: 'row',
    backgroundColor: '#202124',
    padding: 24,
    gap: 24,
  },
  timerBox: {
    flex: 1,
  },
  timerLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 1,
    marginBottom: 8,
  },
  timerValue: {
    fontSize: 24,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.muted,
    letterSpacing: 1,
    marginBottom: 16,
  },
  evidenceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  evidenceCard: {
    width: (width - 52) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  evidenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  evidenceLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.muted,
  },
  checkIcon: {
    width: 16,
    height: 16,
  },
  photoPlaceholder: {
    height: 80,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderStyle: 'dashed',
  },
  evidenceSub: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.text,
  },
  amountCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 20,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  amountLabel: {
    fontSize: 13,
    color: Colors.muted,
  },
  amountValue: {
    fontSize: 13,
    fontFamily: Fonts.latin.medium,
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: '#EFEFEF',
    marginVertical: 12,
  },
  finalLabel: {
    fontSize: 15,
    fontFamily: Fonts.latin.bold,
    color: Colors.text,
  },
  finalValue: {
    fontSize: 18,
    fontFamily: Fonts.latin.bold,
    color: Colors.text,
  },
  approvalBox: {
    flexDirection: 'row',
    marginTop: 16,
    padding: 12,
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    gap: 8,
  },
  approvalText: {
    fontSize: 11,
    color: '#E65100',
    flex: 1,
    lineHeight: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    gap: 12,
  },
  addPhotoBtn: {
    flex: 1,
    height: 56,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    gap: 8,
  },
  addPhotoText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  completeBtn: {
    flex: 2,
    height: 56,
    borderRadius: Radius.sm,
    backgroundColor: '#202124',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
