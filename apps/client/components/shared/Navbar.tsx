import BlackButton from './BlackButton';
import LightButton from './LightButton';
import Image from 'next/image';
import GridLayout from './GridLayout';

const NavBar = () => {
  return (
    <div className="w-screen h-18 sticky top-0 bg-[#f3f3f3] z-40 shadow-md">
      <GridLayout>
        <div className="py-4 flex justify-between">
          <Image width={220} height={44} src="/images/logo.png" alt="" />
          <div className="flex space-x-4">
            <BlackButton
              size={14}
              href="/auth/sign-in"
              text="Room Observation"
            />
            <LightButton size={14} href="/auth/sign-in" text="Sign in" />
          </div>
        </div>
      </GridLayout>
    </div>
  );
};

export default NavBar;
