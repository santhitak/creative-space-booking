import BlackButton from './BlackButton';
import LightButton from './LightButton';
import Image from 'next/image';

const NavBar = () => {
  return (
    <div className="w-screen h-72 sticky top-0">
      <div className="px-16 py-4 flex justify-between">
        <Image width={220} height={44} src="/images/logo.png" alt="" />
        <div className="flex space-x-4">
          <BlackButton size={14} href="/auth/sign-in" text="Room Observation" />
          <LightButton size={14} href="/auth/sign-in" text="Sign in" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
