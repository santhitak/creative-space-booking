import { RoomListBox, ScheduleView } from '@/components/booking';
import { GridLayout, Loading } from '@/components/shared';
import { useEffect, useState } from 'react';
import { Room } from 'types';

const BookingPage = () => {
  const url = process.env.BACKEND_URL;
  const [room, setRoom] = useState<Room[]>();
  const [roomData, setRoomData] = useState<Room>();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${url}/booking/room`);
      setRoom(await response.json());
    }
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <GridLayout>
      <div className="min-h-[90vh] w-auto flex items-center">
        <div className="h-full w-full py-20 flex justify-center">
          {!room && (
            <div>
              <Loading />
            </div>
          )}
          {room && (
            <div className="min-w-full flex flex-col gap-y-6">
              <div className="">
                <RoomListBox
                  room={room}
                  roomData={!roomData ? room[0] : roomData}
                  setRoomData={setRoomData}
                />
                <ScheduleView room={!roomData ? room[0] : roomData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </GridLayout>
  );
};

export default BookingPage;
