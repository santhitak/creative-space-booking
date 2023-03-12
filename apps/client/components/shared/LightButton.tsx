import Link from 'next/link';

interface Props {
  text: string;
  href: string;
}

const LightButton = (props: Props) => {
  return (
    <Link href={props.href}>
      <button
        className={`px-4 lg:px-6 py-2 rounded-[20px] lg:text-[16px] text-sm bg-[#f3f3f3] border border-[#1e1e1e]`}
      >
        <p>{props.text}</p>
      </button>
    </Link>
  );
};

export default LightButton;
