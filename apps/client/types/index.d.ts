export type User = {
  userId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
};

export type Room = {
  id: number;
  name: string;
  openTime: string;
  closeTime: string;
  booking: Booking;
};

export type Booking = {
  roomId: number;
  studentId: string;
  startTime: string;
  endTime: string;
  purpose: string;
  createdAt: Date;
};
