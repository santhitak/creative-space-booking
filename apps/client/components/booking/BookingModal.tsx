import { Transition, Dialog } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import { Room } from 'types';
import PurposeRadio from './PurposeRadio';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

interface Props {
  room: Room;
  open: boolean;
  setOpen: (open: boolean) => void;
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
  const { open, setOpen, room } = props;
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
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
                            min="2023-04-15T09:00:00"
                            max="2023-04-16T21:00:00"
                            className="bg-gray-200/30 pr-2"
                          />
                        </div>
                        <div className="flex gap-x-2 py-2 border-gray-100 bg-gray-200/70 border rounded-md">
                          <p className="pl-2">To</p>
                          <input
                            type="datetime-local"
                            name=""
                            id=""
                            min="2023-04-15T09:00:00"
                            max="2023-04-16T21:00:00"
                            className="bg-gray-200/30 pr-2"
                          />
                        </div>
                        <p className="font-semibold text-[#1b1b1b]">Purpose</p>
                        <PurposeRadio purpose={purpose} />
                        <button className="text-blue-800 text-opacity-90 py-4 flex gap-x-4 items-center md:justify-end md:-mr-20 justify-center">
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
