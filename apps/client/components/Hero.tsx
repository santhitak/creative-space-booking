import Image from 'next/image';
import GridLayout from './shared/GridLayout';

const Hero = () => {
  return (
    <>
      <div className="relative h-[200px] lg:h-[480px]">
        <Image fill src="/images/bg.png" alt="" />
        <div className="absolute top-0 h-full flex items-center">
          <GridLayout>
            <>
              <h2 className="font-semibold text-[#f3f3f3] text-2xl lg:text-7xl">
                Co-Working Space
              </h2>
              <h2 className="font-semibold text-[#f3f3f3] text-2xl lg:text-7xl">
                Creative Room Booking System
              </h2>
              <p className="text-[#f3f3f3] mt-8 text-sm lg:text-base">
                Booking with CORB today for a better living.
              </p>
            </>
          </GridLayout>
        </div>
      </div>
    </>
  );
};

export default Hero;
