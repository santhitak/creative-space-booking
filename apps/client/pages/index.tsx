import { Cases, Hero } from '@/components/home';
import { Footer, Navbar } from '@/components/shared';
import { getCookies } from 'cookies-next';
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
  let data = null;

  if (studentId) {
    data = await fetch(`${url}/auth/u/${studentId}`, {
      headers: {
        Authorization: `Bearer ${studentId}`,
      },
    });
  }

  const user = data ? await data.json() : null;

  return {
    props: {
      userData: user,
    },
  };
};

export default Index;
