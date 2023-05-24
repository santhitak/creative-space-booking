import { Booking, DateInterface, Room, User } from 'types';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect, useState } from 'react';
import BookingModal from './BookingModal';
const localizer = momentLocalizer(moment);

interface Props {
  room: Room;
  userData: User;
}

const ScheduleView = ({ room, userData }: Props) => {
  const url = process.env.LOCAL_BACKEND_URL;
  const date = new Date();
  const [user] = useState<User>(userData);
  const [openBooking, setOpenBooking] = useState(false);
  const [currentDateShow] = useState(false);
  const [booking, setBooking] = useState([]);
  const dateMoment: DateInterface = {
    todayMoment: moment(),
    tomorrowMoment: moment().clone().add(1, 'days'),
    today: moment().format('LL'),
    tomorrow: moment().clone().add(1, 'days').format('LL'),
  };

  useEffect(() => {
    async function getBooking() {
      const response = await fetch(`${url}/booking/all/${room.id}`);
      const data = await response.json();

      const arr = data.map((v: Booking) => ({
        start: new Date(v.start),
        end: new Date(v.end),
        title: `Booked for ${v.purpose}`,
      }));
      setBooking(arr);
    }

    getBooking();
  }, [room.id]);

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
                className="bg-blue-800 px-4 py-2 text-white rounded-md"
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
              events={booking}
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
          userData={user}
        />
      </div>
    </div>
  );
};

export default ScheduleView;
