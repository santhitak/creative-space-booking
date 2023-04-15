import { Room } from 'types';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import eventList from 'pages/booking/events';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import BookingModal from './BookingModal';
const localizer = momentLocalizer(moment);

interface Props {
  room: Room;
}

const ScheduleView = (props: Props) => {
  const { room } = props;
  const date = new Date();
  const [openBooking, setOpenBooking] = useState(false);
  const [currentDateShow, setCurrentDateShow] = useState(false);
  const dateMoment = {
    todayMoment: moment(),
    tomorrowMoment: moment().clone().add(1, 'days'),
    today: moment().format('LL'),
    tomorrow: moment().clone().add(1, 'days').format('LL'),
  };

  return (
    <div className="w-full">
      <div className="border border-gray-200 rounded-md">
        <div className=" bg-gray-100/80 px-6 py-4 rounded-t-md justify-between grid gap-2 md:flex">
          <div className="space-x-2 items-center divide-x gap-x-2 flex">
            <div>
              <p className="font-semibold">
                {!currentDateShow ? dateMoment.today : dateMoment.tomorrow}
              </p>
              <p>
                {!currentDateShow
                  ? date.toLocaleDateString('en-th', { weekday: 'long' })
                  : ''}
              </p>
            </div>
            <div className="pl-4">
              <button
                className="border bg-gray-300 py-2 text-gray-600 font-semibold px-4 rounded-md"
                onClick={() => {
                  !currentDateShow
                    ? setCurrentDateShow(true)
                    : setCurrentDateShow(false);
                }}
              >
                {!currentDateShow ? 'Next' : 'Prev'}
              </button>
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
              events={eventList}
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
        <BookingModal open={openBooking} setOpen={setOpenBooking} room={room} />
      </div>
    </div>
  );
};

export default ScheduleView;
