import { CalendarEvent } from 'types';

const eventList: CalendarEvent[] = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2023, 3, 10),
    end: new Date(2023, 3, 11),
  },
  {
    id: 1,
    title: 'long title',
    start: new Date(2023, 3, 13),
    end: new Date(2023, 3, 14),
  },
];

export default eventList;
