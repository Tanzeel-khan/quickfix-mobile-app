import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { UserTabNavigator } from './UserTabNavigator';
import { ActiveBookingScreen } from '../screens/user/ActiveBookingScreen';
import { FeedbackScreen } from '../screens/user/FeedbackScreen';
import { DisputeScreen } from '../screens/user/DisputeScreen';
import { BookingSuccessScreen } from '../screens/user/BookingSuccessScreen';
import { AutoRescheduleScreen } from '../screens/user/AutoRescheduleScreen';
import { ProviderLoginScreen } from '../screens/provider/ProviderLoginScreen';
import { ProviderTabNavigator } from './ProviderTabNavigator';
import { ProviderActiveJobScreen } from '../screens/provider/ProviderActiveJobScreen';
import { ProviderCompleteScreen } from '../screens/provider/ProviderCompleteScreen';
import { ProviderInsightsScreen } from '../screens/provider/ProviderInsightsScreen';
import { ProviderReviewsScreen } from '../screens/provider/ProviderReviewsScreen';
import { ProviderCancelScreen } from '../screens/provider/ProviderCancelScreen';
import { ProviderDisputeResponseScreen } from '../screens/provider/ProviderDisputeResponseScreen';
import type { RootStackParams } from './types';

const Stack = createNativeStackNavigator<RootStackParams>();

export function RootNavigator() {
  const { token, user } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          user?.role === 'provider' ? (
            <>
              <Stack.Screen name="ProviderTabs" component={ProviderTabNavigator} />
              <Stack.Screen name="ProviderActiveJob" component={ProviderActiveJobScreen} options={{ title: 'Active Job' }} />
              <Stack.Screen name="ProviderComplete" component={ProviderCompleteScreen} options={{ title: 'Complete Job' }} />
              <Stack.Screen name="ProviderInsights" component={ProviderInsightsScreen} />
              <Stack.Screen name="ProviderReviews" component={ProviderReviewsScreen} />
              <Stack.Screen name="ProviderCancel" component={ProviderCancelScreen} />
              <Stack.Screen name="ProviderDisputeResponse" component={ProviderDisputeResponseScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="UserTabs" component={UserTabNavigator} />
              <Stack.Screen name="ActiveBooking" component={ActiveBookingScreen} />
              <Stack.Screen name="BookingSuccess" component={BookingSuccessScreen} />
              <Stack.Screen name="AutoReschedule" component={AutoRescheduleScreen} />
              <Stack.Screen name="Feedback" component={FeedbackScreen} />
              <Stack.Screen name="Dispute" component={DisputeScreen} />
              <Stack.Screen name="ProviderLogin" component={ProviderLoginScreen} />
            </>
          )
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ProviderLogin" component={ProviderLoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
