import BlackButton from './BlackButton';
import LightButton from './LightButton';
import Image from 'next/image';
import GridLayout from './GridLayout';
import Link from 'next/link';

interface IProps {
  slot: JSX.Element;
}

const Navbar = (props: IProps) => {
  return (
    <div className="w-max-screen w-screen">
      <div className="w-full h-18 sticky top-0 bg-[#f3f3f3] z-40 shadow-md">
        <GridLayout>
          <div className="py-4 flex justify-between items-center">
            <Link href="/">
              <Image width={220} height={44} src="/images/logo.png" alt="" />
            </Link>
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
      <div className="h-auto w-screen">{props.slot}</div>
    </div>
  );
};

export default Navbar;
