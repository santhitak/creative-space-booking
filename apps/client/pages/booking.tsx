import { RoomListBox, ScheduleView } from '@/components/booking';
import { GridLayout, Loading, Navbar } from '@/components/shared';
import { useEffect, useState } from 'react';
import { Room, User } from 'types';

const url = process.env.BACKEND_URL;

interface IProps {
  userData: User;
}

const BookingPage = ({ userData }: IProps) => {
  const [user] = useState<User>(userData);
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
    <Navbar userData={user}>
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
                  <ScheduleView
                    room={!roomData ? room[0] : roomData}
                    userData={user}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </GridLayout>
    </Navbar>
  );
};

import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getCookies } from 'cookies-next';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const req = context.req;
  const res = context.res;
  const cookie = getCookies({ req, res });
  const studentId = cookie[`corb_token`];

  const data = await fetch(`${url}/auth/u/${studentId}`);

  const user = await data.json();

  return {
    props: {
      userData: user,
    },
  };
};

export default BookingPage;
