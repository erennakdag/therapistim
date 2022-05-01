// Next and React
import Head from 'next/head';
import { useRouter } from 'next/router';
import { removeCookies } from 'cookies-next';
import usePatient from '../../hooks/usePatient';

// UI
import {
  Center,
  Stack,
  Avatar,
  Button,
  Loader,
  Text,
  Card,
} from '@mantine/core';
import DarkThemeToggler from '../../components/DarkThemeToggler';

// API
import { deletePatientById } from '../../lib/API';

export default () => {
  const { data, isLoading, isRedirect } = usePatient();
  const router = useRouter();

  if (isRedirect) {
    return <div>Redirecting...</div>;
  } else if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  // Get the unneccessary field out of the way
  const { id, password, ...userData } = data;

  // User/Patient's initials
  const names = userData.name.split(' ');
  const userInitials = names[0][0] + names[names.length - 1][0];
  const avatarColor = { Male: 'blue', Female: 'red', 'Non-Binary': 'green' }[
    userData.gender
  ];

  return (
    <>
      <Head>
        <title>Profile | {userData.name}</title>
      </Head>
      <DarkThemeToggler />
      <Center style={{ marginTop: '50px' }}>
        <Card
          shadow='lg'
          p='lg'
          style={{ width: '50vw', borderRadius: '30px' }}
        >
          <Center>
            <Stack>
              <Center>
                <Avatar radius='xl' size='xl' color={avatarColor}>
                  {userInitials.toUpperCase()}
                </Avatar>
              </Center>
              {Object.entries(userData).map(([key, value], index) => {
                key = key.replace(/([A-Z])/g, ' $1').toUpperCase();
                return (
                  <div key={index}>
                    <Text weight={700}>{`${key}: `}</Text>
                    <Text>{value}</Text>
                  </div>
                );
              })}
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
            </Stack>
          </Center>
        </Card>
      </Center>
    </>
  );
};
