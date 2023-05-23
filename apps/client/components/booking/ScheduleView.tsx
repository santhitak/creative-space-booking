import { DateInterface, Room } from 'types';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import {
  eventListCreative,
  eventListCreative2,
  eventListPeer1,
  eventListPeer2,
  eventListPeer3,
} from 'data/events';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import BookingModal from './BookingModal';
const localizer = momentLocalizer(moment);

interface Props {
  room: Room;
}

const ScheduleView = ({ room }: Props) => {
  const date = new Date();
  console.log(room);
  const [openBooking, setOpenBooking] = useState(false);
  const [currentDateShow, setCurrentDateShow] = useState(false);
  const dateMoment: DateInterface = {
    todayMoment: moment(),
    tomorrowMoment: moment().clone().add(1, 'days'),
    today: moment().format('LL'),
    tomorrow: moment().clone().add(1, 'days').format('LL'),
  };

  const eventData =
    room.name === 'Peer Tutor Room 1'
      ? eventListPeer1
      : room.name === 'Peer Tutor Room 2'
      ? eventListPeer2
      : room.name === 'Peer Tutor Room 3'
      ? eventListPeer3
      : room.name === 'Creative and Ideation Room 1'
      ? eventListCreative
      : eventListCreative2;

  return (
    <div className="w-full">
      <div className="border border-gray-200 rounded-md">
        <div className=" bg-gray-100/80 px-6 py-4 rounded-t-md justify-between grid gap-2 md:flex">
          <div className="space-x-2 items-center divide-x gap-x-2 flex">
            <div>
              <p className="font-semibold">{dateMoment.today}</p>
              <p>
                {!currentDateShow
                  ? date.toLocaleDateString('en-th', { weekday: 'long' })
                  : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center divide-x gap-x-4">
            <p className="font-medium">{room?.name}</p>
            <div className="pl-4">
              <button
                className="bg-blue-700 px-4 py-2 text-white rounded-md"
                onClick={() => {
                  setOpenBooking(true);
                }}
              >
                Add booking
              </button>
            </div>
          </div>
        </div>
        <div className="h-[60vh] overflow-y-scroll">
          <div className="flex">
            <Calendar
              localizer={localizer}
              events={eventData}
              defaultView="day"
              startAccessor="start"
              endAccessor="end"
              min={moment('9:00', 'h:mm').toDate()}
              max={moment('21:00', 'h:mm').toDate()}
              defaultDate={dateMoment.today}
              step={15}
              style={{
                width: '100%',
              }}
            />
          </div>
        </div>
        <BookingModal
          open={openBooking}
          setOpen={setOpenBooking}
          room={room}
          dateMoment={dateMoment}
        />
      </div>
    </div>
  );
};

export default ScheduleView;
