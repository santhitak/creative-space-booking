import Link from 'next/link';

export function NotFoundPage() {
  return (
    <div className="bg-[#f3f3f3] w-screen h-screen flex flex-col gap-y-16 items-center justify-center">
      <div className="flex flex-col gap-y-2 items-center">
        <img src="/images/error.svg" alt="" />
        <p className="font-semibold text-2xl">
          Current page doesn&apos;t exist
        </p>
      </div>
      <Link href={'/'} className="bg-[#1d1d1d] rounded-md px-4 py-2 text-white">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
