import Image from 'next/image';

const Hero = () => {
  return (
    <>
      <div className="relative w-screen h-[480px]">
        <Image fill src="/images/bg.png" alt="" />
        <div className="absolute top-0 h-full flex items-center">
          <div className="px-24">
            <h2 className="font-semibold text-[#f3f3f3] text-7xl">
              Co-Working Space
            </h2>
            <h2 className="font-semibold text-[#f3f3f3] text-7xl">
              Creative Room Booking System
            </h2>
            <p className="text-[#f3f3f3] mt-8">
              Booking with CORB today for a better living.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
