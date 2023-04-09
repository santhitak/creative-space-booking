import { Room } from 'types';

interface Props {
  room: Room;
}

const ScheduleView = (props: Props) => {
  const { room } = props;
  const date = new Date();
  return (
    <div className="w-full">
      <div className="border border-gray-200 rounded-md">
        <div className=" bg-gray-100/80 px-6 py-4 rounded-t-md flex justify-between">
          <div className="">
            <p className="font-semibold">
              {date.toLocaleDateString('en-th', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            {date.toLocaleDateString('en-th', { weekday: 'long' })}
          </div>
          <div className="flex items-center divide-x gap-x-4">
            <p className="font-medium">
              {room?.name ? room.name : 'Peer Tutor Room 1'}
            </p>
            <div className="pl-4">
              <button className="bg-blue-700 px-4 py-2 text-white rounded-md">
                Add booking
              </button>
            </div>
          </div>
        </div>
        <div className="h-[60vh] overflow-y-scroll"></div>
      </div>
    </div>
  );
};

export default ScheduleView;
