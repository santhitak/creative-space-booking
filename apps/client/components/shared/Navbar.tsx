import BlackButton from './BlackButton';
import LightButton from './LightButton';
import Image from 'next/image';
import GridLayout from './GridLayout';
import Link from 'next/link';
import { User } from '../../types';

interface Props {
  children: React.ReactNode;
  user?: User;
}

const Navbar = ({ children, user }: Props) => {
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
              {!user ? (
                <LightButton href="/auth/sign-in" text="Sign in" />
              ) : (
                <LightButton href="/auth/sign-in" text={user.firstName} />
              )}
            </div>
          </div>
        </GridLayout>
      </div>
      <div className="h-auto w-screen">{children}</div>
    </div>
  );
};

export default Navbar;
