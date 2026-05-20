import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProviderInboxScreen } from '../screens/provider/ProviderInboxScreen';
import { ProviderScheduleScreen } from '../screens/provider/ProviderScheduleScreen';
import { ProviderInsightsScreen } from '../screens/provider/ProviderInsightsScreen';
import { ProviderProfileScreen } from '../screens/provider/ProviderProfileScreen';
import { View, Text } from 'react-native';
import { Colors } from '../theme';

const Tab = createBottomTabNavigator();

export function ProviderTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#D94027',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: { 
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#EEEEEE',
          height: 60,
          paddingBottom: 8,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={ProviderInsightsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-analytics" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={ProviderScheduleScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-range" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={ProviderInboxScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="bell-outline" size={size} color={color} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProviderProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
