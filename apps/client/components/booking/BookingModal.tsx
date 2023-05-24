import { Transition, Dialog } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { Booking, DateInterface, Room, User } from 'types';
import PurposeRadio from './PurposeRadio';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { Toaster, toast } from 'react-hot-toast';

interface Props {
  room: Room;
  open: boolean;
  setOpen: (open: boolean) => void;
  dateMoment: DateInterface;
  userData: User;
}

export interface RadioChoice {
  name: string;
}

const purpose: RadioChoice[] = [
  {
    name: 'Meeting',
  },
  {
    name: 'Projects',
  },
  {
    name: 'Study',
  },
];

const BookingModal = (props: Props) => {
  const url = process.env.LOCAL_BACKEND_URL;
  const [user] = useState<User>(props.userData);
  const { open, setOpen, room, dateMoment } = props;
  const cancelButtonRef = useRef(null);

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [usagePurpose, setUsagePurpose] = useState(purpose[0]);

  const handleValidate = (data: Booking) => {
    const time = {
      start: parseInt(startTime.split('T')[1].slice(0, 2)),
      end: parseInt(endTime.split('T')[1].slice(0, 2)),
    };

    console.log('start time:', time.start);
    console.log('end time:', time.end);

    if (time.start < 9) {
      toast.error('Room is open at 09:00AM');
      return false;
    } else if (time.end > 21) {
      toast.error('Room is close at 09:00AM');
      return false;
    } else if (time.end < time.start) {
      toast.error('Please select valid time');
      return false;
    } else if (time.end - time.start > 2) {
      toast.error('Maximum booking is two hours');
      return false;
    } else if (data.purpose === '') {
      toast.error('Please select up room booking purpose');
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = () => {
    const data: Booking = {
      roomId: room.id,
      studentId: user.studentId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      purpose: usagePurpose.name,
      title: `${user.studentId} (${usagePurpose.name})`,
    };

    if (handleValidate(data)) {
      fetch(`${url}/booking/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.ok) {
          toast.success('Create booking complete');
          location.reload();
        }
      });
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <Toaster
          toastOptions={{
            style: {
              maxWidth: 1000,
            },
          }}
        />
        <div className="fixed inset-0 z-20 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 -translate-y-32 md:-translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white flex flex-col justify-center items-center">
                  <Dialog.Title
                    as="h2"
                    className="text-xl font-semibold leading-6 text-gray-900 pb-6 bg-blue-800 bg-opacity-90 w-full"
                  >
                    <p className="text-white pt-6 pl-4">Book {room?.name}</p>
                  </Dialog.Title>
                  <div className="flex flex-col justify-center items-center gap-y-4 mt-3 pt-3 text-center sm:mt-0 sm:text-left">
                    <div className="flex flex-col text-left gap-y-2 p-4">
                      <div className="flex flex-col gap-y-4">
                        <p className="font-semibold text-[#1b1b1b]">
                          Pick date
                        </p>
                        <div className="flex gap-x-2 py-2 border-gray-100 bg-gray-200/70 border rounded-md">
                          <p className="pl-2">From</p>
                          <input
                            type="datetime-local"
                            name=""
                            id=""
                            value={startTime}
                            min={dateMoment.todayMoment.format().split('+')[0]}
                            max={
                              dateMoment.tomorrowMoment.format().split('+')[0]
                            }
                            onChange={(e) => setStartTime(e.target.value)}
                            className="bg-gray-200/30 pr-2"
                          />
                        </div>
                        <div className="flex gap-x-2 py-2 border-gray-100 bg-gray-200/70 border rounded-md">
                          <p className="pl-2">To</p>
                          <input
                            type="datetime-local"
                            name=""
                            id=""
                            value={endTime}
                            min={dateMoment.todayMoment.format().split('+')[0]}
                            max={
                              dateMoment.tomorrowMoment.format().split('+')[0]
                            }
                            onChange={(e) => setEndTime(e.target.value)}
                            className="bg-gray-200/30 pr-2"
                          />
                        </div>
                        <p className="font-semibold text-[#1b1b1b]">Purpose</p>
                        <PurposeRadio
                          purpose={purpose}
                          usagePurpose={usagePurpose}
                          setUsagePurpose={setUsagePurpose}
                        />
                        <button
                          className="text-blue-800 text-opacity-90 py-4 flex gap-x-4 items-center md:justify-end md:-mr-20 justify-center"
                          onClick={() => handleSubmit()}
                        >
                          <p>Submit Booking</p>
                          <BsFillArrowRightCircleFill />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default BookingModal;
