export type User = {
  userId?: string;
  email?: string;
  studentId?: string;
  firstName?: string;
  lastName?: string;
};

export type Room = {
  id: number;
  name: RoomName;
  openTime: string;
  closeTime: string;
  booking: Booking;
};

type RoomName =
  | 'Peer Tutor Room 1'
  | 'Peer Tutor Room 2'
  | 'Peer Tutor Room 3'
  | 'Creative and Ideation Room 1'
  | 'Creative and Ideation Room 2';

export type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: unknown;
};

export type Booking = {
  roomId: number;
  studentId: string;
  startTime: string;
  endTime: string;
  purpose: string;
  createdAt: Date;
};

export interface DateInterface {
  todayMoment: moment.Moment;
  tomorrowMoment: moment.Moment;
  today: string;
  tomorrow: string;
}
