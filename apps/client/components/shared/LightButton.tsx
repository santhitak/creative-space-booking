import Link from 'next/link';

interface Props {
  text: string;
  href?: string;
  action?: () => void;
}

const LightButton = (props: Props) => {
  return (
    <>
      {props.href && (
        <Link href={props.href} onClick={props.action}>
          <button
            className={`px-4 lg:px-6 py-2 rounded-[20px] lg:text-[16px] text-sm bg-[#f3f3f3] border border-[#1e1e1e]`}
          >
            <p>{props.text}</p>
          </button>
        </Link>
      )}
      {!props.href && (
        <button
          onClick={props.action}
          className={`px-4 lg:px-6 py-2 rounded-[20px] lg:text-[16px] text-sm bg-[#f3f3f3] border border-[#1e1e1e]`}
        >
          <p>{props.text}</p>
        </button>
      )}
    </>
  );
};

export default LightButton;
