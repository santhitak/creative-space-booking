import { Fragment } from 'react';
import { Menu } from '@headlessui/react';
import { StoreUserAuth } from 'lib/store';
import Link from 'next/link';

interface TabMenu {
  href?: string;
  label: string;
  action?: void;
}

interface Props {
  user: StoreUserAuth;
  handleSignout: void;
}

function UserMenu({ user, handleSignout }: Props) {
  const links: TabMenu[] = [
    { href: '/history', label: 'History' },
    { label: 'Sign out', action: handleSignout },
  ];

  return (
    <Menu>
      <Menu.Button>{user.studentId}</Menu.Button>
      <Menu.Items>
        {links.map((item: TabMenu, i: number) => (
          <Menu.Item key={i} as={Fragment}>
            {({ active }) => (
              <>
                {item.href && (
                  <Link
                    href={item.href}
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
                {!item.href && (
                  <p
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                    }`}
                    onClick={() => item.action}
                  >
                    {item.label}
                  </p>
                )}
              </>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}

export default UserMenu;
