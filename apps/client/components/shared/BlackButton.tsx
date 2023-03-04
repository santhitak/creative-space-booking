import Link from 'next/link';

interface Props {
  text: string;
  size: number;
  href: string;
}

const BlackButton = (props: Props) => {
  const textSize = `text-[${props.size}px]`;
  return (
    <Link href={props.href}>
      <button
        className={`px-6 py-2 rounded-[20px] ${textSize} text-[#f3f3f3] bg-[#1e1e1e] border border-[#f3f3f3]`}
      >
        <p>{props.text}</p>
      </button>
    </Link>
  );
};

export default BlackButton;
