import { GridLayout, Loading, Navbar } from '@/components/shared';
import { getCookies } from 'cookies-next';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import { User } from 'types';

const url = process.env.BACKEND_URL;
interface IProps {
  userData: User;
}

interface RoomChoice {
  id: number;
  name: string;
}

const people = [
  {
    id: 1,
    fullName: 'Leslie Alexander',
    roomId: 3,
    startTime: '2023-05-24T03:49:00.000',
    endTime: '2023-05-24T05:49:00.000',
  },

  {
    id: 2,
    Name: 'Leslie Alexander',
    roomId: 5,
    startTime: '2023-05-25T03:49:00.000',
    endTime: '2023-05-25T05:49:00.000',
  },
];

export function BookingHistory({ userData }: IProps) {
  const [user] = useState<User>(userData);
  const [history, setHistory] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  // setLoading(true)
  //   async function getBookingHistory() {
  //     const response = await fetch(``);
  //     const data = await response.json();
  //     setHistory(data);
  //setLoading(false)
  //   }
  //   getBookingHistory();
  // });

  const room: RoomChoice[] = [
    { id: 1, name: 'Peer Tutor Room 1' },
    { id: 2, name: 'Peer Tutor Room 2' },
    { id: 3, name: 'Peer Tutor Room 3' },
    { id: 4, name: 'Creative and Ideation Room 1' },
    { id: 5, name: 'Creative and Ideation Room 2' },
  ];

  function checkRoom(roomId: number) {
    const currentRoom: RoomChoice[] = room.filter((room) => {
      return room.id === roomId;
    });

    return currentRoom[0].name;
  }

  return (
    <Navbar userData={user}>
      <GridLayout>
        <div className="min-h-[90vh] w-full flex justify-center">
          {isLoading && <Loading />}
          {!isLoading && (
            <div className="flex justify-center w-full">
              {history.length === 0 && (
                <div className="mt-20 w-full flex flex-col gap-y-6 divide-y divide-gray-100">
                  <p className="font-semibold text-xl">Booking History</p>
                  <ul role="list" className="divide-y divide-gray-100 px-6">
                    {people.map((person) => (
                      <li
                        key={person.id}
                        className="flex justify-between gap-x-6 py-5"
                      >
                        <div className="flex gap-x-4">
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm  font-semibold leading-6 text-gray-900">
                              {checkRoom(person.roomId)}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              Date:{' '}
                              {person.startTime
                                .slice(0, 10)
                                .split('-')
                                .reverse()
                                .join('/')}{' '}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              Time:{' '}
                              {new Date(person.startTime + '-0700')
                                .toISOString()
                                .split('T')[1]
                                .slice(0, 5)}{' '}
                              -{' '}
                              {new Date(person.endTime + '-0700')
                                .toISOString()
                                .split('T')[1]
                                .slice(0, 5)}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {history.length !== 0 && (
                <div className="min-w-full flex flex-col gap-y-6">
                  <div className="flex justify-center items-center flex-col gap-y-2">
                    <p className="font-semibold text-gray-500">
                      No booking history
                    </p>
                    <p className="text-blue-600 underline underline-offset-2">
                      Book now
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </GridLayout>
    </Navbar>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const req = context.req;
  const res = context.res;
  const cookie = getCookies({ req, res });
  const studentId = cookie[`corb_token`];

  if (studentId) {
    const data = await fetch(`${url}/auth/u/${studentId}`);

    const user = await data.json();

    return {
      props: {
        userData: user,
      },
    };
  } else {
    return {
      props: {
        userData: null,
      },
    };
  }
};

export default BookingHistory;
