import GridLayout from './GridLayout';
import Link from 'next/link';

interface Footer {
  services: MenuItem[];
  credit: {
    credit: string;
    app: string;
  };
}

interface MenuItem {
  title: string;
  item: Items[];
}

interface Items {
  href: string;
  appeared: string;
}

const FooterContent: Footer[] = [
  {
    services: [
      {
        title: 'Services',
        item: [
          {
            href: '/auth/sign-in',
            appeared: 'Booking',
          },
          {
            href: '/auth/sign-in',
            appeared: 'Scheduling',
          },
        ],
      },
      {
        title: 'Contact',
        item: [
          {
            href: 'https://github.com/nata-non',
            appeared: 'Backend Developer',
          },
          {
            href: 'https://github.com/santhitak',
            appeared: 'Frontend Developer',
          },
        ],
      },
    ],
    credit: {
      credit: 'All rights reserved. Powered by the CORB',
      app: 'Co-Working Space Creative Room Booking',
    },
  },
];

const Footer = () => {
  return (
    <div className=" bg-[#1E1E1E]">
      <GridLayout>
        {FooterContent.map((item: Footer, i: number) => (
          <div
            className="flex flex-col md:flex-row space-y-16 md:space-y-0 justify-between md:items-end text-[#f3f3f3] py-10"
            key={i}
          >
            <div className="flex space-x-14">
              {item.services.map((v: MenuItem, j: number) => (
                <div key={j} className="space-y-6">
                  <p className="font-semibold">{v.title}</p>
                  <div className="flex flex-col">
                    {v.item.map((li: Items, k: number) => (
                      <Link href={li.href} key={k}>
                        {li.appeared}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="md:text-right">
              <p>{item.credit.credit}</p>
              <p>{item.credit.app}</p>
            </div>
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default Footer;
