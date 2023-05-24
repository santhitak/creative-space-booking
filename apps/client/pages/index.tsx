import { Cases, Hero } from '@/components/home';
import { Footer, Navbar } from '@/components/shared';
import { getCookie, getCookies } from 'cookies-next';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { User } from 'types';

const url = process.env.BACKEND_URL;
interface IProps {
  userData: User;
}

export function Index({ userData }: IProps) {
  const [user] = useState<User>(userData);
  return (
    <Navbar userData={user}>
      <div className="bg-[#f3f3f3]">
        <Hero />
        <Cases />
        <Footer />
      </div>
    </Navbar>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const req = context.req;
  const res = context.res;
  const cookie = getCookies({ req, res });
  const studentId = cookie[`corb_token`];

  if (studentId) {
    const data = await fetch(`${url}/auth/u/${studentId}`);

    const user = await data.json();
    return {
      props: {
        userData: user,
      },
    };
  } else {
    return {
      props: {
        userData: null,
      },
    };
  }
};

export default Index;
