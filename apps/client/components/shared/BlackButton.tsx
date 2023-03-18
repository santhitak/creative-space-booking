import Link from 'next/link';

interface Props {
  text: JSX.Element;
  href: string;
}

const BlackButton = (props: Props) => {
  return (
    <Link href={props.href}>
      <button
        className={`px-4 lg:px-6 py-2 rounded-[20px] lg:text-[16px] text-sm text-[#f3f3f3] bg-[#1e1e1e] border border-[#f3f3f3]`}
      >
        <p>{props.text}</p>
      </button>
    </Link>
  );
};

export default BlackButton;
