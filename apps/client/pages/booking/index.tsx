import { ScheduleView } from '@/components/booking';
import { GridLayout, Loading } from '@/components/shared';
import { useEffect, useState } from 'react';
import { Room } from 'types';

const BookingPage = () => {
  const url = process.env.BACKEND_URL;
  const [selected, setSelected] = useState(1);
  const [room, setRoom] = useState<Room[]>();
  const [roomData, setRoomData] = useState<Room>();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${url}/booking/room`);
      setRoom(await response.json());
    }
    fetchData();
  }, []);

  return (
    <GridLayout>
      <div className="min-h-[90vh] h-auto w-full flex items-center">
        <div className="h-full w-full py-20 flex justify-center">
          {!room && (
            <div>
              <Loading />
            </div>
          )}
          {room && (
            <div className="flex flex-col gap-y-6">
              <div className="flex gap-x-4">
                {room.map((item: Room) => (
                  <button
                    onClick={() => {
                      setSelected(item.id);
                      setRoomData(item);
                    }}
                    className={`${
                      selected === item.id
                        ? 'bg-blue-800 text-white'
                        : 'border border-blue-800 text-blue-800'
                    } rounded-md py-3 px-4 select-none`}
                    key={item.id}
                  >
                    <p>{item.name}</p>
                  </button>
                ))}
              </div>
              <div className="">
                <ScheduleView room={roomData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </GridLayout>
  );
};

export default BookingPage;
