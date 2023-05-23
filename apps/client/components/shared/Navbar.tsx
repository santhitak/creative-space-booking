import BlackButton from './BlackButton';
import LightButton from './LightButton';
import Image from 'next/image';
import GridLayout from './GridLayout';
import Link from 'next/link';
import { useState } from 'react';
import { SignInModal } from '../auth';
import { useRouter } from 'next/router';
import { User } from 'types';

interface Props {
  children: React.ReactNode;
  userData: User;
}

const Navbar = ({ children, userData }: Props) => {
  const [open, setOpen] = useState(false);
  const [user] = useState<User>(userData);
  const router = useRouter();
  const handleSignOut = async () => {
    await fetch('/api/signout', {
      method: 'POST',
    }).then(() => router.push('/'));
  };

  return (
    <div>
      <div className="w-full h-18 sticky top-0 bg-[#f3f3f3] z-40 shadow-md">
        <GridLayout>
          <div className="py-4 flex justify-between items-center">
            <Link href="/">
              <Image
                width={200}
                height={30}
                src="/images/logo.png"
                priority
                style={{ width: '200', height: '30' }}
                alt=""
              />
            </Link>
            <div>
              {!user ? (
                <LightButton action={() => setOpen(true)} text="Sign in" />
              ) : (
                <div className="flex space-x-4">
                  <BlackButton href="/booking" text={<p>Room Observation</p>} />
                  <LightButton text={user.studentId} />
                  <LightButton
                    text={'Sign out'}
                    action={() => handleSignOut()}
                  />
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
