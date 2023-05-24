import { usePathname } from 'next/navigation';
import Image from 'next/image';
import GridLayout from './GridLayout';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { SignInModal } from '../auth';
import { useRouter } from 'next/router';
import { User } from 'types';
import { Menu, Transition } from '@headlessui/react';
import { RiArrowDownSLine } from 'react-icons/ri';

interface Props {
  children: React.ReactNode;
  userData: User;
}

const Navbar = ({ children, userData }: Props) => {
  const [open, setOpen] = useState(false);
  const [user] = useState<User>(userData);
  const router = useRouter();
  const pathname = usePathname();

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Booking', href: '/booking' },
    { name: 'History', href: '/booking-history' },
  ];

  const handleSignOut = async () => {
    await fetch('/api/signout', {
      method: 'POST',
    }).then(() => router.push('/'));
  };

  return (
    <div>
      <div className="z-20 w-full h-18 sticky top-0 bg-[#f3f3f3] shadow-md">
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
            <Menu as="div" className="relative inline-block">
              <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 gap-2">
                  {user ? (
                    <div className="px-4 py-2 bg-blue-800 rounded-md text-[#f1f1f1] flex items-center gap-1">
                      <p>{user.studentId}</p>
                      <RiArrowDownSLine className="w-5 h-5" />
                    </div>
                  ) : (
                    <div
                      className="px-6 py-2 bg-blue-800 rounded-md text-[#f1f1f1]"
                      onClick={() => setOpen(true)}
                    >
                      <p>Sign in</p>
                    </div>
                  )}
                </Menu.Button>
              </div>
              {user && (
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 ">
                    <div>
                      {navigation.map((item, i) => (
                        <Menu.Item key={i}>
                          {({ active }) => (
                            <Link
                              href={item.href}
                              className={classNames(
                                pathname === item.href ? 'bg-gray-100' : '',
                                'flex w-full px-4 py-2 text-sm text-gray-700'
                              )}
                              aria-current={
                                pathname === item.href ? 'page' : undefined
                              }
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'flex w-full px-4 py-2 text-sm text-gray-700'
                          )}
                          onClick={handleSignOut}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              )}
            </Menu>
          </div>
        </GridLayout>
      </div>
      <SignInModal open={open} setOpen={setOpen} />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Navbar;
