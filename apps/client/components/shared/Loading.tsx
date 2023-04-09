import { AiOutlineLoading } from 'react-icons/ai';

const Loading = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <AiOutlineLoading className="w-20 h-20 animate-spin text-blue-800" />
    </div>
  );
};

export default Loading;
