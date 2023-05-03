import BlackButton from './BlackButton';
import LightButton from './LightButton';
import Image from 'next/image';
import GridLayout from './GridLayout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SignInModal } from '../auth';
import { useStore } from 'lib/store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

interface Props {
  children: React.ReactNode;
}

const useAuth = () => {
  return useStore((store) => ({
    user: store.user,
    setUser: store.setUser,
  }));
};

const Navbar = ({ children }: Props) => {
  const url = process.env.BACKEND_URL;
  const { user, setUser } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const cookies = Cookies.get('corb_token');
    console.log(cookies);
    if (cookies) {
      try {
        fetch(`${url}/auth/u/${cookies}`).then(async (response) => {
          const data = await response.json();
          setUser(data);
        });
      } catch (error) {
        throw Error(error);
      }
    } else {
      console.log('Session ID not found');
    }
  }, []);

  const handleSignout = () => {
    setUser(null);
    Cookies.remove('corb_token');
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
