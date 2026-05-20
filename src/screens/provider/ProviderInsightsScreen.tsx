import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Platform } from 'react-native';
import { Colors, Spacing, Radius, Fonts } from '../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export function ProviderInsightsScreen({ navigation }: any) {
  const weeklyTarget = 32000;
  const currentEarnings = 21840;
  const progress = currentEarnings / weeklyTarget;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Insights</Text>
        <Text style={styles.headerSub}>Week of Aug 19</Text>
        <TouchableOpacity style={styles.compareBtn}>
           <Icon name="swap-vertical" size={18} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Earnings Card */}
        <View style={styles.earningsCard}>
          <Text style={styles.cardLabel}>EARNINGS THIS WEEK</Text>
          <View style={styles.earningsRow}>
             <Text style={styles.earningsValue}>Rs. 21,840</Text>
             <View style={styles.upliftBadge}>
                <Text style={styles.upliftText}>+15% vs last</Text>
             </View>
          </View>
          <Text style={styles.projectionText}>Projected by end of week · Rs. 32,000</Text>
          
          <View style={styles.chartContainer}>
             <View style={styles.chartBars}>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <View key={day} style={styles.barCol}>
                     <View style={[styles.bar, { height: i === 2 ? 80 : 30 + (i * 5) }, i === 2 && styles.barActive]} />
                     <Text style={[styles.barDay, i === 2 && styles.barDayActive]}>{day}</Text>
                  </View>
                ))}
             </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
             <View style={styles.statHeader}>
                <Text style={styles.statLabel}>JOBS TODAY</Text>
                <Icon name="package-variant" size={16} color={Colors.muted} />
             </View>
             <Text style={styles.statValue}>4</Text>
             <Text style={styles.statSub}>of 5 planned</Text>
             <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '80%', backgroundColor: '#D94027' }]} />
             </View>
          </View>

          <View style={styles.statBox}>
             <View style={styles.statHeader}>
                <Text style={styles.statLabel}>ON-TIME</Text>
                <Icon name="clock-outline" size={16} color={Colors.muted} />
             </View>
             <Text style={styles.statValue}>96%</Text>
             <Text style={styles.statSub}>last 30 jobs</Text>
             <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '96%', backgroundColor: '#4CAF50' }]} />
             </View>
          </View>

          <TouchableOpacity style={styles.statBox} onPress={() => navigation.navigate('ProviderReviews')}>
             <View style={styles.statHeader}>
                <Text style={styles.statLabel}>RATING</Text>
                <Icon name="star" size={16} color="#FBC02D" />
             </View>
             <Text style={styles.statValue}>4.6</Text>
             <Text style={styles.statSub}>from 88 reviews</Text>
             <View style={styles.starsRow}>
                {[1,2,3,4,5].map(s => <Icon key={s} name="star" size={10} color={s <= 4 ? "#FBC02D" : "#E0E0E0"} />)}
             </View>
          </TouchableOpacity>

          <View style={styles.statBox}>
             <View style={styles.statHeader}>
                <Text style={styles.statLabel}>CANCEL RATE</Text>
                <Icon name="close-circle-outline" size={16} color={Colors.muted} />
             </View>
             <Text style={styles.statValue}>1.2%</Text>
             <Text style={styles.statSub}>below 5% target</Text>
             <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '30%', backgroundColor: '#4CAF50' }]} />
             </View>
          </View>
        </View>

        {/* Forecast Card */}
        <View style={styles.forecastCard}>
          <Text style={styles.cardLabel}>BUSIEST HOURS · FORECAST</Text>
          <View style={styles.forecastContent}>
             {/* Simplified forecast chart */}
             <View style={styles.chartLineRow}>
                {[1,2,3,4,3,5,6,5,4,3].map((h, i) => (
                  <View key={i} style={[styles.forecastBar, { height: h * 10 }]} />
                ))}
             </View>
             <View style={styles.forecastLabels}>
                <Text style={styles.fLabel}>8</Text>
                <Text style={styles.fLabel}>9</Text>
                <Text style={styles.fLabel}>10</Text>
                <Text style={styles.fLabel}>11</Text>
                <Text style={styles.fLabel}>12</Text>
                <Text style={styles.fLabel}>1</Text>
                <Text style={styles.fLabel}>2</Text>
                <Text style={styles.fLabel}>3</Text>
                <Text style={styles.fLabel}>4</Text>
                <Text style={styles.fLabel}>5</Text>
                <Text style={styles.fLabel}>6</Text>
                <Text style={styles.fLabel}>7</Text>
             </View>
          </View>
          <View style={styles.demandTip}>
             <Text style={styles.tipText}>
               🔥 <Text style={styles.bold}>Open 4-6 PM slot</Text> tomorrow — agent expects +3 requests
             </Text>
          </View>
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
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
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
  compareBtn: {
    position: 'absolute',
    right: 24,
    top: 24,
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  earningsCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 2 },
    }),
  },
  cardLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.muted,
    letterSpacing: 1,
    marginBottom: 12,
  },
  earningsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  earningsValue: {
    fontSize: 28,
    fontFamily: Fonts.latin.bold,
    color: Colors.text,
  },
  upliftBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  upliftText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2E7D32',
  },
  projectionText: {
    fontSize: 11,
    color: Colors.muted,
    marginBottom: 20,
  },
  chartContainer: {
    height: 120,
    justifyContent: 'flex-end',
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  barCol: {
    alignItems: 'center',
    gap: 8,
  },
  bar: {
    width: 24,
    backgroundColor: '#F1F3F4',
    borderRadius: 4,
  },
  barActive: {
    backgroundColor: '#D94027',
  },
  barDay: {
    fontSize: 10,
    color: Colors.muted,
    fontWeight: '600',
  },
  barDayActive: {
    color: '#D94027',
    fontWeight: '800',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 20,
  },
  statBox: {
    width: (width - 40) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: Colors.muted,
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 20,
    fontFamily: Fonts.latin.bold,
    color: Colors.text,
  },
  statSub: {
    fontSize: 10,
    color: Colors.muted,
    marginTop: 2,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F1F3F4',
    borderRadius: 2,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 12,
  },
  forecastCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 40,
    padding: 20,
    borderRadius: 16,
  },
  forecastContent: {
    marginTop: 16,
  },
  chartLineRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 80,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  forecastBar: {
    flex: 1,
    backgroundColor: '#F1F3F4',
    marginHorizontal: 2,
    borderRadius: 2,
  },
  forecastLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  fLabel: {
    fontSize: 9,
    color: Colors.muted,
    textAlign: 'center',
  },
  demandTip: {
    backgroundColor: '#FFF1F0',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  tipText: {
    fontSize: 11,
    color: '#D94027',
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
});
