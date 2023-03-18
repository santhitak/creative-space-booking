import Image from 'next/image';
import BlackButton from '../shared/BlackButton';
import GridLayout from '../shared/GridLayout';

interface Card {
  url: string;
  title: string;
  desc: string;
}

const CasesCard: Card[] = [
  {
    url: '/images/cases1.png',
    title: 'Easy to use',
    desc: 'Super easy booking system to saves your time with a few click!',
  },
  {
    url: '/images/cases2.png',
    title: 'Advance Booking',
    desc: 'Advance booking helps a lot with your plan',
  },
  {
    url: '/images/cases3.png',
    title: 'Booking Schedule',
    desc: 'An easy schedule to make your booking simple as it should',
  },
  {
    url: '/images/cases4.png',
    title: 'Secure Data',
    desc: 'Stores booking history, your data is safe with us!',
  },
];

const Cases = () => {
  return (
    <GridLayout>
      <div className="w-full py-20 min-h-[64vh]">
        <div className="flex flex-col items-center space-y-4 py-10">
          <h3 className="text-2xl font-bold text-[#1E1E1E]">
            Booking System Service
          </h3>
          <p className="text-sm text-[#767676]">What we provide</p>
        </div>
        <div className="grid grid-cols-4 gap-12">
          {CasesCard.map((item: Card, i: number) => (
            <div
              key={i}
              className="bg-[#FAFAFA] rounded-md col-span-4 md:col-span-1"
            >
              <div className="p-10 flex flex-col items-center space-y-4">
                <Image
                  src={item.url}
                  width={100}
                  height={100}
                  alt={item.title}
                />
                <p className="font-semibold text-lg">{item.title}</p>
                <p className="text-[#A6A6A6] font-sm w-4/6 text-center">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="py-14 flex flex-col items-center">
          <h4 className="text-4xl py-4">
            <b>Planning</b> to held <b>an appointment?</b>
          </h4>
          <BlackButton
            href="/booking"
            text={
              <div className="flex space-x-4 items-center">
                <p>Book now</p>

                <svg
                  width="16"
                  height="11"
                  viewBox="0 0 16 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.4984 0.5L10.7418 1.34038L13.9518 4.90579H0V6.09429L13.9517 6.09433L10.7418 9.65962L11.4984 10.5L16 5.5L11.4984 0.5Z"
                    fill="#F3F3F3"
                  />
                </svg>
              </div>
            }
          />
        </div>
      </div>
    </GridLayout>
  );
};

export default Cases;
