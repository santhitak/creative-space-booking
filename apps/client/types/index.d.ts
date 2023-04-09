export type User = {
  userId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
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
