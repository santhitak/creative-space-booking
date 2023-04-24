import { useStore } from 'lib/store';
import Image from 'next/image';
import { useRouter } from 'next/router';

const useAuth = () => {
  return useStore((store) => ({
    setUser: store.setUser,
  }));
};

const SignIn = () => {
  const { setUser } = useAuth();
  const url = process.env.BACKEND_URL;
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push(`${url}/sign-in/google`);
      }}
      className="bg-[#f7f7f7] border border-[#c4c4c4]/50 rounded-md w-full py-3 flex justify-center items-center space-x-4 px-8"
    >
      <div className="w-6 h-6 relative">
        <Image src="/images/google.png" fill alt="google_logo" />
      </div>
      <p className="font-semibold text-gray-700">Sign in with Google</p>
    </button>
  );
};

export default SignIn;
