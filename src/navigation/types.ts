export type RootStackParams = {
  Login: undefined;
  Register: undefined;
  UserTabs: undefined;
  ActiveBooking: { bookingId: string };
  Feedback: { bookingId: string; providerId: string };
  Dispute: { bookingId: string };
};

export type UserTabParams = {
  Chat: undefined;
  Bookings: undefined;
  Notifications: undefined;
  Profile: undefined;
};
