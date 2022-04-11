// Next and React
import Head from 'next/head';
import { useState } from 'react';

// UI
import {
  Center,
  Button,
  Stack,
  TextInput,
  PasswordInput,
  Title,
  Checkbox,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { At, Key } from 'tabler-icons-react';

// API
import API, { urls } from '../../lib/API';

export default () => {
  // Colors of the icons depending if there is an error
  const [keyColor, setKeyColor] = useState('#adb6bd');
  const [atColor, setAtColor] = useState('#adb6bd');

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Center style={{ width: '100%', marginTop: '5vh' }}>
        <form
          onSubmit={form.onSubmit((values) => {
            API.post(urls.post.VALIDATE_PATIENT, values)
              .then((res) => {
                // Unauthorised access -> Password incorrect
                if (res === 401) {
                  setKeyColor('red');
                  return alert('Invalid password');
                }
                // Not found -> Email incorrect
                if (res === 404) {
                  setAtColor('red');
                  return alert('Account not found. Try to register.');
                }
                // Found -> Login successful, redirect to homepage
                sessionStorage.setItem('user', JSON.stringify(res.id));
                return (window.location.href = '/');
              })
              .catch((err) => {
                console.log(err);
              });
          })}
        >
          <Stack>
            <Title>Login</Title>
            <TextInput
              name='email'
              label='Email'
              placeholder='Email'
              icon={<At color={atColor} />}
              style={{ width: '30vw' }}
              required
              {...form.getInputProps('email')}
            />
            <PasswordInput
              name='password'
              label='Password'
              placeholder='Password'
              icon={<Key color={keyColor} />}
              required
              {...form.getInputProps('password')}
            />
            <Checkbox label='Remember me?' color='grape' />
            <Button type='submit' color='grape'>
              Login
            </Button>
          </Stack>
        </form>
      </Center>
    </>
  );
};
