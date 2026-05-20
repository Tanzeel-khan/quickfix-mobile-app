import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Colors, Spacing, Radius, Fonts } from '../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function ProviderActiveJobScreen({ navigation }: any) {
  const checklist = [
    { id: '1', task: 'Diagnose cooling fault', done: true },
    { id: '2', task: 'Inspect compressor & gas', done: true },
    { id: '3', task: 'Replace capacitor (if needed)', inProgress: true },
    { id: '4', task: 'Refill refrigerant (if needed)' },
    { id: '5', task: 'Test run 30 min · log temp' },
    { id: '6', task: 'Capture before/after photos' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>QF-2086</Text>
          <Text style={styles.headerSub}>Active job</Text>
        </View>
        <View style={styles.statusBadge}>
          <View style={styles.pulseDot} />
          <Text style={styles.statusText}>En route</Text>
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.customerCard}>
          <View style={styles.customerHeader}>
            <View style={styles.avatar}>
               <Text style={styles.avatarText}>H</Text>
            </View>
            <View style={styles.flex1}>
              <Text style={styles.customerName}>Hassan Iqbal</Text>
              <View style={styles.ratingRow}>
                 <Text style={styles.rating}>★ 4.9</Text>
                 <Text style={styles.bookings}>customer · 8 bookings</Text>
              </View>
            </View>
            <View style={styles.actionIcons}>
               <TouchableOpacity style={styles.iconBtn}>
                  <Icon name="chat" size={20} color={Colors.text} />
               </TouchableOpacity>
               <TouchableOpacity style={styles.iconBtnPrimary}>
                  <Icon name="phone" size={20} color="#FFFFFF" />
               </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.locationContainer}>
             <View style={styles.locLeft}>
                <Text style={styles.address}>Street 24, House 10-A, G-13/3</Text>
                <Text style={styles.distance}>2.7 km · ETA 21 min</Text>
             </View>
             <TouchableOpacity style={styles.navigateBtn}>
                <Icon name="navigation-variant" size={18} color={Colors.text} />
                <Text style={styles.navigateText}>Navigate</Text>
             </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROBLEM BRIEF</Text>
          <View style={styles.briefBox}>
             <Text style={styles.briefText}>
               "AC bilkul kaam nahi kar raha, kal subah G-13 mein technician chahiye, budget zyada nahi hai."
             </Text>
          </View>
          <View style={styles.tagsContainer}>
             {['INVERTER UNIT', 'NOT COOLING', 'HIGH SEVERITY', 'BUDGET RS. 4K'].map(tag => (
               <View key={tag} style={styles.extractedTag}>
                  <Text style={styles.extractedTagText}>{tag}</Text>
               </View>
             ))}
          </View>
        </View>

        <View style={styles.checklistSection}>
           <Text style={styles.sectionTitle}>JOB CHECKLIST</Text>
           {checklist.map(item => (
             <View key={item.id} style={styles.checkItem}>
                <View style={[
                  styles.checkBox, 
                  item.done && styles.checkDone, 
                  item.inProgress && styles.checkProgress
                ]}>
                  {item.done && <Icon name="check" size={14} color="#FFF" />}
                  {item.inProgress && <View style={styles.progressDot} />}
                </View>
                <Text style={[styles.checkLabel, item.done && styles.textDone]}>{item.task}</Text>
                {item.inProgress && (
                  <View style={styles.inProgressBadge}>
                     <Text style={styles.inProgressText}>In progress</Text>
                  </View>
                )}
             </View>
           ))}
        </View>
      </ScrollView>

       <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.cancelBtn}
            onPress={() => navigation.navigate('ProviderCancel', { bookingId: 'QF-2086' })}
          >
             <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
         <TouchableOpacity 
           style={styles.reachedBtn}
           onPress={() => navigation.navigate('ProviderComplete', { bookingId: 'QF-2086' })}
          >
            <Text style={styles.reachedText}>I'm en route ✓</Text>
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
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2E7D32',
  },
  container: {
    flex: 1,
  },
  customerCard: {
    margin: 20,
    padding: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
  },
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  flex1: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontFamily: Fonts.latin.bold,
    color: Colors.text,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  rating: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FBC02D',
    marginRight: 6,
  },
  bookings: {
    fontSize: 10,
    color: Colors.muted,
  },
  actionIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  iconBtnPrimary: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#202124',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  locLeft: {
    flex: 1,
  },
  address: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  distance: {
    fontSize: 11,
    color: Colors.muted,
    marginTop: 2,
  },
  navigateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    gap: 6,
  },
  navigateText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.muted,
    letterSpacing: 1,
    marginBottom: 12,
  },
  briefBox: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderLeftWidth: 4,
    borderLeftColor: '#D94027',
  },
  briefText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: Colors.text,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 12,
  },
  extractedTag: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  extractedTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.muted,
  },
  checklistSection: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F9F9F9',
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  checkDone: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkProgress: {
    borderColor: '#D94027',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D94027',
  },
  checkLabel: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  textDone: {
    color: Colors.muted,
    textDecorationLine: 'line-through',
  },
  inProgressBadge: {
    backgroundColor: '#FFF1F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  inProgressText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#D94027',
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
  cancelBtn: {
    flex: 1,
    height: 56,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#D94027',
  },
  reachedBtn: {
    flex: 2,
    height: 56,
    borderRadius: Radius.sm,
    backgroundColor: '#202124',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reachedText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
