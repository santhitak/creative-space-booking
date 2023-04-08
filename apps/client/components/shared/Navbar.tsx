import BlackButton from './BlackButton';
import LightButton from './LightButton';
import Image from 'next/image';
import GridLayout from './GridLayout';
import Link from 'next/link';
import { User } from '../../types';
import { useState } from 'react';
import { SignInModal } from '../auth';

interface Props {
  children: React.ReactNode;
  user?: User;
}

const Navbar = ({ children, user }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="w-full h-18 sticky top-0 bg-[#f3f3f3] z-40 shadow-md">
        <GridLayout>
          <div className="py-4 flex justify-between items-center">
            <Link href="/">
              <Image width={220} height={44} src="/images/logo.png" alt="" />
            </Link>
            <div>
              {!user ? (
                <LightButton
                  href="#"
                  action={() => setOpen(true)}
                  text="Sign in"
                />
              ) : (
                <div className="flex space-x-4">
                  <BlackButton
                    href="/auth/sign-in"
                    text={<p>Room Observation</p>}
                  />
                  <LightButton href="/auth/sign-in" text={user.firstName} />
                </div>
              )}
            </div>
          </div>
        </GridLayout>
      </div>
      <SignInModal open={open} setOpen={setOpen} />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Navbar;
