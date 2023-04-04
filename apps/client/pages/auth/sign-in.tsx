import { SignInButton } from '@/components/auth';
import { GridLayout } from '@/components/shared';

const SignIn = () => {
  return (
    <GridLayout>
      <div className="h-full flex flex-col gap-y-10 py-10">
        <div className="w-full h-4/5 bg-slate-400 rounded-lg"></div>
        <div className="flex flex-col gap-y-4">
          <div className="text-3xl font-semibold text-center">
            <h4>Simply Book</h4>
            <h4>your room here</h4>
          </div>
          <div className="text-gray-600 text-center">
            <p>Make your reservation easier</p>
            <p>
              With <span className="font-semibold">CORB</span>
            </p>
          </div>
        </div>
        <SignInButton />
      </div>
    </GridLayout>
  );
};

export default SignIn;
