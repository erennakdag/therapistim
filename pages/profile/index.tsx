// Next and React
import Head from 'next/head';
import { useRouter } from 'next/router';
import { removeCookies } from 'cookies-next';
import usePatient from '../../hooks/usePatient';

// UI
import { Button } from '@mantine/core';

// API
import API, { urls } from '../../lib/API';

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
      <Button
        color='red'
        onClick={() => {
          removeCookies('user');

          // Deletes the user with the given ID
          API.delete(urls.delete.DELETE_PATIENT + data.id)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              if (err.response.status === 404) {
                console.log(err);
                throw new Error("This user doesn't exist anyway!");
              } else {
                console.log(err);
              }
            });

          router.push('/');
        }}
      >
        Delete My Account
      </Button>
    </>
  );
};
