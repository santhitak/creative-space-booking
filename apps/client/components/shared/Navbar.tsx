import BlackButton from './BlackButton';
import LightButton from './LightButton';
import Image from 'next/image';
import GridLayout from './GridLayout';

const Navbar = () => {
  return (
    <div className="w-screen h-18 sticky top-0 bg-[#f3f3f3] z-40 shadow-md">
      <GridLayout>
        <div className="py-4 flex justify-between items-center">
          <Image width={220} height={44} src="/images/logo.png" alt="" />
          <div className="hidden lg:flex space-x-4">
            <BlackButton href="/auth/sign-in" text="Room Observation" />
            <LightButton href="/auth/sign-in" text="Sign in" />
          </div>
          <div className="lg:hidden">
            <LightButton href="/auth/sign-in" text="Sign in" />
          </div>
        </div>
      </GridLayout>
    </div>
  );
};

export default Navbar;
