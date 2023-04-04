import { headers } from 'next.config';
import Image from 'next/image';

const SignIn = () => {
  const url = process.env.BACKEND_URL;
  const handleSignIn = () => {
    fetch(`${url}/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="h-screen">
      <button
        onClick={handleSignIn}
        className="bg-[#f7f7f7] border border-[#c4c4c4]/50 rounded-md w-full py-3 flex justify-center items-center space-x-4"
      >
        <div className="w-6 h-6 relative">
          <Image src="/images/google.png" fill alt="google_logo" />
        </div>
        <p className="font-semibold text-gray-700">Sign in with Google</p>
      </button>
    </div>
  );
};

export default SignIn;