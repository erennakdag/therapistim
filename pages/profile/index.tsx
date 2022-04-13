// Next and React
import Head from 'next/head';
import { useRouter } from 'next/router';
import { removeCookies } from 'cookies-next';
import usePatient from '../../hooks/usePatient';

// UI
import { Button } from '@mantine/core';

export default () => {
  const [data, isRedirect] = usePatient();
  const router = useRouter();

  if (isRedirect) {
    return <div>Redirecting...</div>;
  }

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div>{JSON.stringify(data)}</div>
      <Button
        onClick={() => {
          removeCookies('user');
          router.push('/login');
        }}
      >
        Logout
      </Button>
    </>
  );
};
