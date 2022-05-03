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
  Modal,
} from '@mantine/core';
import DarkThemeToggler from '../../components/DarkThemeToggler';
import UpdatePatientInfo from '../../components/UpdatePatientInfo';

// API
import { deletePatientById } from '../../lib/API';
import { useState } from 'react';

export default () => {
  const { data, isLoading, isRedirect } = usePatient();
  const router = useRouter();
  const [opened, setOpened] = useState(false);

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
  const { id, password, hasPrivateInsurance, ...userData } = data;

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

      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title='Change Your Password and Phone Number'
      >
        <UpdatePatientInfo id={id} />
      </Modal>

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
                key =
                  key[0].toUpperCase() +
                  key
                    .substring(1)
                    .replace(/([A-Z])/g, ' $1')
                    .toLowerCase();
                return (
                  <Text key={index}>
                    <b>{`${key}: `}</b> {value || 'Not given'}
                  </Text>
                );
              })}
              {/* TODO: Open modal to change password */}
              <Button onClick={() => setOpened(true)}>
                Change Password/Number
              </Button>
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
                  deletePatientById(id)
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
