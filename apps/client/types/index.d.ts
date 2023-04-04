export type User = {
  userId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
};

export type OAuthUser = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
};

export type Room = {
  title: string;
  booking: Booking;
};

export type Booking = {
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
};
