import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Colors, Spacing, Radius, Fonts } from '../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function ProviderInboxScreen({ navigation }: any) {
  const requests = [
    {
      id: '1',
      customer: 'Hassan Iqbal',
      service: 'AC repair · Inverter',
      urgency: 'URGENT',
      timing: 'WITHIN 20M',
      match: 92,
      when: 'Tomorrow · 10:00 AM',
      where: 'G-13 / 2.3 km',
      payout: 'Rs. 3,200',
      countdown: '0:17',
      isUrgent: true,
    },
    {
      id: '2',
      customer: 'Saira A.',
      service: 'AC service · annual',
      urgency: 'ROUTINE',
      timing: '',
      match: 81,
      when: 'Today · 4:00 PM',
      where: 'F-11 / 4.2 km',
      payout: 'Rs. 1,888',
      countdown: '',
      isUrgent: false,
    },
    {
      id: '3',
      customer: 'Mehdi K.',
      service: 'AC install · split',
      urgency: 'HIGH-VALUE',
      timing: 'COMPLEX',
      match: 74,
      when: 'Thu · 11:00 AM',
      where: 'I-8 / 5.4 km',
      payout: 'Rs. 6,500',
      countdown: '',
      isUrgent: false,
    }
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Requests</Text>
          <Text style={styles.headerSub}>3 new · 1 urgent</Text>
        </View>
        <View style={styles.statusToggle}>
           <View style={styles.onlineDot} />
           <Text style={styles.onlineText}>Online</Text>
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.surgeAlert}>
           <Text style={styles.surgeIcon}>🔥</Text>
           <View style={styles.flex1}>
             <Text style={styles.surgeTitle}>Demand surge near you</Text>
             <Text style={styles.surgeSub}>Heatwave alert. Accepting now earns 1.5x surge.</Text>
           </View>
        </View>

        <TouchableOpacity 
          style={styles.disputeNotification}
          onPress={() => navigation.navigate('ProviderDisputeResponse', { disputeId: 'QF-2086' })}
        >
           <View style={styles.disputeIcon}>
              <Icon name="alert-octagon" size={20} color="#D94027" />
           </View>
           <View style={styles.flex1}>
              <Text style={styles.disputeTitle}>Action Required · Dispute Raised</Text>
              <Text style={styles.disputeSub}>Hassan Iqbal (QF-2086) filed a claim · 2hr left</Text>
           </View>
           <Icon name="chevron-right" size={20} color={Colors.muted} />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>INCOMING</Text>

        {requests.map(req => (
          <View key={req.id} style={styles.card}>
            {req.isUrgent && (
              <View style={styles.urgentBanner}>
                 <Text style={styles.urgentBannerText}>URGENT · BEST MATCH FOR YOU</Text>
                 <Text style={styles.countdown}>{req.countdown}</Text>
              </View>
            )}
            
            <View style={styles.cardContent}>
              <View style={styles.cardTop}>
                <View style={styles.avatar}>
                   <Text style={styles.avatarText}>{req.customer[0]}</Text>
                </View>
                <View style={styles.flex1}>
                   <Text style={styles.customerName}>{req.customer}</Text>
                   <Text style={styles.serviceText}>{req.service}</Text>
                </View>
                <View style={styles.matchBox}>
                   <Text style={styles.matchLabel}>YOUR MATCH</Text>
                   <Text style={[styles.matchValue, req.match > 90 && { color: '#4CAF50' }]}>{req.match}</Text>
                </View>
              </View>

              <View style={styles.tagsRow}>
                 <View style={[styles.tag, req.isUrgent && styles.urgentTag]}>
                   <Text style={[styles.tagText, req.isUrgent && styles.urgentTagText]}>{req.urgency}</Text>
                 </View>
                 {req.timing ? (
                   <View style={styles.tag}>
                     <Text style={styles.tagText}>{req.timing}</Text>
                   </View>
                 ) : null}
              </View>

              <View style={styles.infoGrid}>
                 <View style={styles.infoItem}>
                   <Text style={styles.infoLabel}>WHEN</Text>
                   <Text style={styles.infoValue}>{req.when}</Text>
                 </View>
                 <View style={styles.infoItem}>
                   <Text style={styles.infoLabel}>WHERE</Text>
                   <Text style={styles.infoValue}>{req.where}</Text>
                 </View>
                 <View style={styles.infoItem}>
                   <Text style={styles.infoLabel}>PAYOUT</Text>
                   <Text style={styles.infoValue}>{req.payout}</Text>
                 </View>
              </View>

              <View style={styles.btnRow}>
                <TouchableOpacity style={styles.declineBtn}>
                   <Text style={styles.declineText}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                   style={styles.acceptBtn}
                   onPress={() => navigation.navigate('Jobs')}
                >
                   <Text style={styles.acceptText}>Accept ✓</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
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
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: Fonts.latin.bold,
    color: Colors.text,
  },
  headerSub: {
    fontSize: 12,
    color: Colors.muted,
  },
  statusToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8F5E9',
    backgroundColor: '#F1F8F3',
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  onlineText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2E7D32',
  },
  container: {
    flex: 1,
  },
  surgeAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1F0',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD8D6',
  },
  surgeIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  surgeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D94027',
  },
  surgeSub: {
    fontSize: 12,
    color: '#D94027',
    opacity: 0.8,
  },
  disputeNotification: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD8D6',
    borderLeftWidth: 4,
    borderLeftColor: '#D94027',
    gap: 12,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 2 },
    }),
  },
  disputeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF1F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disputeTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#D94027',
  },
  disputeSub: {
    fontSize: 11,
    color: Colors.muted,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.muted,
    letterSpacing: 1.5,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    overflow: 'hidden',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 4 },
    }),
  },
  urgentBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#D94027',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  urgentBannerText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  countdown: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  cardContent: {
    padding: 16,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
  customerName: {
    fontSize: 16,
    fontFamily: Fonts.latin.bold,
    color: Colors.text,
  },
  serviceText: {
    fontSize: 12,
    color: Colors.muted,
  },
  matchBox: {
    alignItems: 'flex-end',
  },
  matchLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: Colors.muted,
    letterSpacing: 0.5,
  },
  matchValue: {
    fontSize: 22,
    fontFamily: Fonts.latin.bold,
    color: Colors.text,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  urgentTag: {
    backgroundColor: '#FFEBEE',
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.muted,
  },
  urgentTagText: {
    color: '#D32F2F',
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    marginBottom: 20,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: Colors.muted,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 12,
    fontFamily: Fonts.latin.medium,
    color: Colors.text,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  declineBtn: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  declineText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  acceptBtn: {
    flex: 2,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#202124',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  acceptText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
