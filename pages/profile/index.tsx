// Next and React
import Head from 'next/head';
import { useRouter } from 'next/router';
import { removeCookies } from 'cookies-next';
import usePatient from '../../hooks/usePatient';

// UI
import { Avatar, Button, Loader } from '@mantine/core';

// API
import { deletePatientById } from '../../lib/API';

export default () => {
  const { data, isLoading, isRedirect } = usePatient();
  const router = useRouter();

  if (isRedirect) {
    return <div>Redirecting...</div>;
  } else if (isLoading) {
    return <Loader />;
  }

  // User/Patient's initials
  const names = data.name.split(' ');
  const userInitials = names[0][0] + names[names.length - 1][0];

  return (
    <>
      <Head>
        <title>Profile | {data.name}</title>
      </Head>
      <Avatar radius='xl' size='xl'>
        {userInitials.toUpperCase()}
      </Avatar>
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
          deletePatientById(data.id)
            .then((_) => {
              router.push('/');
            })
            .catch((err) => {
              if (err.statusCode === 404) {
                throw new Error("This user doesn't exist anyway!");
              } else {
                console.log(err);
              }
            });
        }}
      >
        Delete My Account
      </Button>
    </>
  );
};
