import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Colors, Spacing, Radius, Fonts } from '../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export function ProviderScheduleScreen({ navigation }: any) {
  const days = [
    { day: 'MON', date: '19' },
    { day: 'TUE', date: '20' },
    { day: 'WED', date: '21', active: true },
    { day: 'THU', date: '22' },
    { day: 'FRI', date: '23' },
    { day: 'SAT', date: '24' },
    { day: 'SUN', date: '25' },
  ];

  const jobs = [
    { time: '9 AM', type: 'job', title: 'AC service · Saira A.', sub: 'I-8 routine', color: '#202124' },
    { time: '10 AM', type: 'spacer' },
    { time: '11 AM', type: 'movement', title: 'AC repair · Hassan I.', sub: 'G-13 inverter', id: 'QF-2086', status: 'IN MOVEMENT', color: '#D94027' },
    { time: '12 PM', type: 'spacer' },
    { time: '1 PM', type: 'spacer' },
    { time: '2 PM', type: 'suggested', title: 'Open slot - high demand', sub: 'Accept to fill', action: 'Accept' },
    { time: '3 PM', type: 'spacer' },
    { time: '4 PM', type: 'job', title: 'AC install · Mehdi K.', sub: 'I-8 complex', id: 'QF-2051', color: '#EEE' },
    { time: '5 PM', type: 'spacer' },
    { time: '6 PM', type: 'spacer' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
         <View>
           <Text style={styles.headerTitle}>Today · Wed Aug 21</Text>
           <Text style={styles.headerSub}>4 jobs · Rs. 11,400 expected</Text>
         </View>
         <TouchableOpacity style={styles.calendarBtn}>
            <Icon name="calendar-month-outline" size={20} color={Colors.text} />
         </TouchableOpacity>
      </View>

      <View style={styles.weekContainer}>
        {days.map(d => (
          <TouchableOpacity key={d.date} style={[styles.dayBox, d.active && styles.dayActive]}>
            <Text style={[styles.dayName, d.active && styles.dayTextActive]}>{d.day}</Text>
            <Text style={[styles.dayDate, d.active && styles.dayTextActive]}>{d.date}</Text>
            {d.active && <View style={styles.activeDot} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
         <View style={styles.timeline}>
            {jobs.map((item, index) => (
              <View key={index} style={styles.timeRow}>
                <View style={styles.timeCol}>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
                
                <View style={styles.contentCol}>
                   {item.type === 'job' && (
                     <TouchableOpacity style={[styles.jobCard, { backgroundColor: item.color }]}>
                        <Text style={[styles.jobTitle, item.color === '#202124' && { color: '#FFF' }]}>{item.title}</Text>
                        <Text style={[styles.jobSub, item.color === '#202124' && { color: 'rgba(255,255,255,0.6)' }]}>{item.sub}</Text>
                        {item.id && <Text style={[styles.jobId, item.color === '#202124' && { color: 'rgba(255,255,255,0.4)' }]}>{item.id}</Text>}
                     </TouchableOpacity>
                   )}

                   {item.type === 'movement' && (
                     <TouchableOpacity 
                       style={[styles.movementCard, { backgroundColor: item.color }]}
                       onPress={() => navigation.navigate('ProviderActiveJob', { bookingId: item.id })}
                     >
                        <View style={styles.movementHeader}>
                           <View style={styles.movementDot} />
                           <Text style={styles.movementStatus}>{item.status}</Text>
                        </View>
                        <Text style={styles.movementTitle}>{item.title}</Text>
                        <Text style={styles.movementSub}>{item.sub}</Text>
                        <Text style={styles.movementId}>{item.id}</Text>
                     </TouchableOpacity>
                   )}

                   {item.type === 'suggested' && (
                     <View style={styles.suggestedCard}>
                        <View style={styles.suggestedBadge}>
                           <Text style={styles.suggestedBadgeText}>AI SUGGESTED</Text>
                        </View>
                        <Text style={styles.suggestedTitle}>{item.title}</Text>
                        <Text style={styles.suggestedSub}>{item.sub}</Text>
                        <TouchableOpacity style={styles.acceptSmall}>
                           <Text style={styles.acceptSmallText}>Accept</Text>
                        </TouchableOpacity>
                     </View>
                   )}

                   {item.type === 'spacer' && <View style={styles.spacerLine} />}
                </View>
              </View>
            ))}
         </View>

         <View style={styles.footerInfo}>
            <Icon name="clock-check-outline" size={14} color={Colors.muted} />
            <Text style={styles.footerText}>22 min travel buffer between G-13 and I-8 · scheduling engine</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
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
  calendarBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dayBox: {
    alignItems: 'center',
    paddingVertical: 8,
    width: 40,
    borderRadius: 8,
  },
  dayActive: {
    backgroundColor: '#202124',
  },
  dayName: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.muted,
    marginBottom: 4,
  },
  dayDate: {
    fontSize: 14,
    fontFamily: Fonts.latin.bold,
    color: Colors.text,
  },
  dayTextActive: {
    color: '#FFFFFF',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D94027',
    marginTop: 4,
  },
  container: {
    flex: 1,
  },
  timeline: {
    paddingTop: 20,
  },
  timeRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    minHeight: 60,
  },
  timeCol: {
    width: 50,
    paddingTop: 4,
  },
  timeText: {
    fontSize: 11,
    color: Colors.muted,
    fontWeight: '700',
  },
  contentCol: {
    flex: 1,
    paddingLeft: 12,
    paddingBottom: 20,
  },
  jobCard: {
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  jobTitle: {
    fontSize: 14,
    fontFamily: Fonts.latin.bold,
  },
  jobSub: {
    fontSize: 11,
    marginTop: 2,
  },
  jobId: {
    fontSize: 9,
    marginTop: 8,
  },
  movementCard: {
    borderRadius: 8,
    padding: 16,
  },
  movementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  movementDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginRight: 6,
  },
  movementStatus: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  movementTitle: {
    fontSize: 14,
    fontFamily: Fonts.latin.bold,
    color: '#FFFFFF',
  },
  movementSub: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  movementId: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 8,
  },
  suggestedCard: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D94027',
    borderStyle: 'dashed',
    backgroundColor: '#FFF1F0',
    padding: 16,
  },
  suggestedBadge: {
    backgroundColor: '#D94027',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 8,
  },
  suggestedBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  suggestedTitle: {
    fontSize: 14,
    fontFamily: Fonts.latin.bold,
    color: '#D94027',
  },
  suggestedSub: {
    fontSize: 11,
    color: '#D94027',
    opacity: 0.8,
  },
  acceptSmall: {
    backgroundColor: '#D94027',
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  acceptSmallText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  spacerLine: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginTop: 12,
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    backgroundColor: '#F8F9FA',
    gap: 8,
  },
  footerText: {
    fontSize: 10,
    color: Colors.muted,
    flex: 1,
    lineHeight: 14,
  },
});
