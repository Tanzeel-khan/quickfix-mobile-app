export type RootStackParams = {
  Login: undefined;
  Register: undefined;
  UserTabs: undefined;
  ActiveBooking: { bookingId: string };
  BookingSuccess: { booking: any };
  AutoReschedule: { bookingId: string };
  Feedback: { bookingId: string; providerId: string };
  Dispute: { bookingId: string };
  ProviderLogin: undefined;
  ProviderTabs: undefined;
  ProviderActiveJob: { bookingId: string };
  ProviderComplete: { bookingId: string };
  ProviderInsights: undefined;
  ProviderReviews: undefined;
  ProviderCancel: { bookingId: string };
  ProviderDisputeResponse: { disputeId: string };
};

export type UserTabParams = {
  Chat: undefined;
  Bookings: undefined;
  Notifications: undefined;
  Profile: undefined;
};
