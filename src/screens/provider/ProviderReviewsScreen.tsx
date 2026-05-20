import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Colors, Spacing, Radius, Fonts } from '../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function ProviderReviewsScreen({ navigation }: any) {
  const reviews = [
    {
      id: '1',
      customer: 'Hassan I.',
      job: 'AC repair',
      idCode: 'QF-2086',
      time: '2 hr ago',
      rating: 5,
      comment: 'Inverter started cooling within 30 minutes. Explained everything clearly. Will book again.',
      tags: ['ON TIME', 'TIDY', 'SKILLED'],
    },
    {
      id: '2',
      customer: 'Saira A.',
      job: 'AC service',
      idCode: 'QF-2074',
      time: '3 days',
      rating: 5,
      comment: 'Quick and professional. Took photos before and after which I appreciated.',
      tags: ['FRIENDLY', 'FAIR PRICE'],
    },
    {
      id: '3',
      customer: 'Faisal R.',
      job: 'AC install',
      idCode: 'QF-2061',
      time: '1 wk',
      rating: 4,
      comment: 'Good work but arrived slightly late due to rain.',
      tags: ['SKILLED'],
    }
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
           <Icon name="chevron-left" size={32} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Reviews</Text>
          <Text style={styles.headerSub}>88 total</Text>
        </View>
        <TouchableOpacity style={styles.filterBtn}>
           <Icon name="tune-variant" size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Rating Summary Card */}
        <View style={styles.summaryCard}>
           <View style={styles.summaryRow}>
              <View style={styles.leftSummary}>
                 <Text style={styles.ratingBig}>4.6</Text>
                 <View style={styles.starsRow}>
                    {[1,2,3,4,5].map(s => <Icon key={s} name="star" size={16} color={s <= 4 ? "#FBC02D" : "#E0E0E0"} />)}
                 </View>
                 <Text style={styles.summaryLabel}>88 reviews · last 90 days</Text>
              </View>
              <View style={styles.rightSummary}>
                 {[5,4,3,2,1].map(s => (
                   <View key={s} style={styles.distRow}>
                      <Text style={styles.distLabel}>{s} ★</Text>
                      <View style={styles.distBar}>
                         <View style={[styles.distFill, { width: s === 5 ? '75%' : s === 4 ? '18%' : '2%' }]} />
                      </View>
                   </View>
                 ))}
              </View>
           </View>

           <View style={styles.trendBox}>
              <Text style={styles.trendText}>
                🔥 <Text style={styles.bold}>Trending theme:</Text> 9 of last 14 reviews mention being "on time". Keep prioritizing early starts to lift your match score by ~3 pts.
              </Text>
           </View>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterContent}>
           {['All', '5★', '4★', 'With photos', 'Disputed'].map((f, i) => (
             <TouchableOpacity key={f} style={[styles.filterTag, i === 0 && styles.filterActive]}>
                <Text style={[styles.filterText, i === 0 && styles.filterTextActive]}>{f}</Text>
             </TouchableOpacity>
           ))}
        </ScrollView>

        {/* Review List */}
        <View style={styles.list}>
          {reviews.map(rev => (
            <View key={rev.id} style={styles.reviewCard}>
               <View style={styles.cardHeader}>
                  <View style={styles.revAvatar}>
                     <Text style={styles.revAvatarText}>{rev.customer[0]}</Text>
                  </View>
                  <View style={styles.flex1}>
                     <Text style={styles.customerName}>{rev.customer}</Text>
                     <Text style={styles.jobInfo}>{rev.idCode} · {rev.job} · {rev.time}</Text>
                  </View>
                  <View style={styles.cardStars}>
                     {[1,2,3,4,5].map(s => <Icon key={s} name="star" size={12} color={s <= rev.rating ? "#FBC02D" : "#E0E0E0"} />)}
                  </View>
               </View>

               <Text style={styles.comment}>{rev.comment}</Text>
               
               <View style={styles.tagRow}>
                  {rev.tags.map(tag => (
                    <View key={tag} style={styles.tag}>
                       <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
               </View>

               <View style={styles.cardFooter}>
                  <TouchableOpacity style={styles.replyBtn}>
                     <Text style={styles.replyBtnText}>Reply</Text>
                  </TouchableOpacity>
                  <Text style={styles.helpfulText}>Helpful · 4</Text>
               </View>
            </View>
          ))}
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
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  leftSummary: {
    alignItems: 'center',
    width: 100,
  },
  ratingBig: {
    fontSize: 48,
    fontFamily: Fonts.latin.bold,
    color: Colors.text,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 4,
    marginVertical: 8,
  },
  summaryLabel: {
    fontSize: 10,
    color: Colors.muted,
    textAlign: 'center',
  },
  rightSummary: {
    flex: 1,
    gap: 4,
  },
  distRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  distLabel: {
    fontSize: 10,
    color: Colors.muted,
    width: 24,
  },
  distBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#F1F3F4',
    borderRadius: 2,
  },
  distFill: {
    height: '100%',
    backgroundColor: '#D94027',
    borderRadius: 2,
  },
  trendBox: {
    backgroundColor: '#FFF1F0',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
  },
  trendText: {
    fontSize: 12,
    color: '#D94027',
    lineHeight: 18,
  },
  bold: {
    fontWeight: 'bold',
  },
  filterScroll: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  filterContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F3F4',
    borderWidth: 1,
    borderColor: '#E8EAED',
  },
  filterActive: {
    backgroundColor: '#202124',
    borderColor: '#202124',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  list: {
    padding: 20,
    gap: 16,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 2 },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  revAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  revAvatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.muted,
  },
  flex1: {
    flex: 1,
  },
  customerName: {
    fontSize: 14,
    fontFamily: Fonts.latin.bold,
    color: Colors.text,
  },
  jobInfo: {
    fontSize: 11,
    color: Colors.muted,
  },
  cardStars: {
    flexDirection: 'row',
    gap: 2,
  },
  comment: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.muted,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  replyBtn: {
    paddingVertical: 4,
  },
  replyBtnText: {
    fontSize: 12,
    color: '#D94027',
    fontWeight: '700',
  },
  helpfulText: {
    fontSize: 11,
    color: Colors.muted,
  },
});
