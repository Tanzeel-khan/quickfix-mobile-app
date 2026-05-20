import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Colors, Spacing, Radius, Fonts } from '../../theme';
import { useAuthStore } from '../../store/authStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function ProviderProfileScreen() {
  const { user, clearAuth } = useAuthStore();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
           <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user?.name?.[0] || 'T'}</Text>
           </View>
           <Text style={styles.name}>{user?.name}</Text>
           <Text style={styles.email}>{user?.email}</Text>
           <View style={styles.badge}>
              <Text style={styles.badgeText}>Verified Provider</Text>
           </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.item}>
             <Icon name="cog-outline" size={24} color={Colors.text} />
             <Text style={styles.itemText}>Availability Settings</Text>
             <Icon name="chevron-right" size={20} color={Colors.muted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
             <Icon name="shield-check-outline" size={24} color={Colors.text} />
             <Text style={styles.itemText}>Safety & Documents</Text>
             <Icon name="chevron-right" size={20} color={Colors.muted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
             <Icon name="bank-outline" size={24} color={Colors.text} />
             <Text style={styles.itemText}>Payout Preferences</Text>
             <Icon name="chevron-right" size={20} color={Colors.muted} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={clearAuth}>
          <Icon name="logout" size={20} color="#D94027" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1E1B18',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontFamily: Fonts.latin.bold,
    color: Colors.text,
  },
  email: {
    fontSize: 14,
    color: Colors.muted,
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2E7D32',
  },
  section: {
    backgroundColor: '#F9F9FB',
    borderRadius: 16,
    padding: 8,
    marginBottom: 40,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    fontFamily: Fonts.latin.medium,
    color: Colors.text,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#FFEBEE',
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#D94027',
  },
});
