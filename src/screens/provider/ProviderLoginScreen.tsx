import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Dimensions, StatusBar } from 'react-native';
import { Colors, Spacing, Radius, Fonts } from '../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export function ProviderLoginScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <View style={styles.logoDot} />
            <Text style={styles.logoText}>quickfix.</Text>
          </View>
          <View style={styles.workspaceBadge}>
            <Text style={styles.workspaceText}>Provider workspace</Text>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Today's jobs,{'\n'}fairly priced.{'\n'}Fewer no-shows.</Text>
          <Text style={styles.heroDesc}>
            Quickfix surfaces jobs you're best matched for, sets fair prices automatically, and reschedules you if a job conflicts.
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>320+</Text>
            <Text style={styles.statLabel}>ACTIVE{'\n'}PROVIDERS</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>+24%</Text>
            <Text style={styles.statLabel}>AVG{'\n'}UPLIFT</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{'<'} 2%</Text>
            <Text style={styles.statLabel}>{'\n'}DISPUTED</Text>
          </View>
        </View>

        {/* Spacer */}
        <View style={styles.flex1} />

        {/* Login Form */}
        <View style={styles.form}>
           <View style={styles.inputWrapper}>
              <Icon name="account-outline" size={20} color="#FFFFFF" style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                placeholder="Work email"
                placeholderTextColor="rgba(255,255,255,0.4)"
                defaultValue="bilal@quickfix.demo"
              />
              <Icon name="check" size={18} color="#4CAF50" />
           </View>

           <TouchableOpacity 
             style={styles.button}
             onPress={() => navigation.navigate('ProviderTabs' as any)}
           >
              <Text style={styles.buttonText}>Continue to workspace</Text>
              <Icon name="arrow-right" size={20} color="#FFFFFF" style={styles.btnIcon} />
           </TouchableOpacity>

           <Text style={styles.footerNote}>
              <Text style={styles.dot}>⦿</Text> Mock auth · partner account
           </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#1E1B18', // Deep dark chocolate/charcoal
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#D94027',
  },
  logoText: {
    fontSize: 20,
    fontFamily: Fonts.latin.bold,
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  workspaceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  workspaceText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  hero: {
    marginTop: 60,
  },
  heroTitle: {
    fontSize: 36,
    fontFamily: Fonts.latin.bold,
    color: '#FFFFFF',
    lineHeight: 42,
  },
  heroDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 22,
    marginTop: 20,
    maxWidth: '90%',
  },
  statsGrid: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  statValue: {
    fontSize: 18,
    fontFamily: Fonts.latin.bold,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 0.5,
    lineHeight: 12,
  },
  flex1: {
    flex: 1,
  },
  form: {
    paddingBottom: 40,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: Radius.sm,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  inputIcon: {
    marginRight: 12,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: Fonts.latin.medium,
  },
  button: {
    backgroundColor: '#D94027', // The signature orange/red
    height: 56,
    borderRadius: Radius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: Fonts.latin.bold,
    marginRight: 8,
  },
  btnIcon: {
    marginTop: 2,
  },
  footerNote: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
  },
  dot: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.2)',
  }
});
