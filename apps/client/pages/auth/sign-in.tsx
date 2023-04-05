import { SignInButton } from '@/components/auth';
import { GridLayout } from '@/components/shared';

const SignIn = () => {
  return (
    <div className="py-20">
      <GridLayout>
        <div className="rounded-md flex flex-col justify-center items-stretch md:items-center gap-y-8 p-8">
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
          <SignInButton />
        </div>
      </GridLayout>
    </div>
  );
};

export default SignIn;
