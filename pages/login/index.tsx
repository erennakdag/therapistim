// Next and React
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { setCookies } from 'cookies-next';

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
import Link from 'next/link';

export default () => {
  // Colors of the icons depending if there is an error
  const [keyColor, setKeyColor] = useState('#adb6bd');
  const [atColor, setAtColor] = useState('#adb6bd');
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
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
            // We don't need rememberMe for the API call
            const { rememberMe, ...reqBody } = values;
            API.post(urls.post.VALIDATE_PATIENT, reqBody)
              .then((res) => {
                // Found -> Login successful
                // setting the auth cookie
                /*
                  For the substring we take res.id.length + 1 (instead of - 1)
                  because the string we are taking it from (JSON.stringify(...))
                  has 2 additional chars (quotation marks at the end and beginning)
                  Also the reason why we are taking the substring to begin with
                */
                setCookies(
                  'user',
                  JSON.stringify(res.id).substring(1, res.id.length + 1),
                  // Setting the cookie to expire in 2030 if the user checked rememberMe
                  rememberMe
                    ? {
                        expires: new Date(
                          new Date().getTime() + 365 * 24 * 60 * 60 * 1000,
                        ),
                      }
                    : {},
                );
                // redirect to homepage
                return router.push('/');
              })
              .catch((err) => {
                const statusCode = err.response.status;
                // Unauthorised access -> Password incorrect
                if (statusCode === 401) {
                  alert('Invalid password');
                  setKeyColor('red');
                }
                // Not found -> Email incorrect
                else if (statusCode === 404) {
                  alert('Account not found. Try to register.');
                  setAtColor('red');
                }
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
            <Checkbox
              label='Remember me?'
              color='grape'
              {...form.getInputProps('rememberMe')}
            />
            <Link href='/register'>
              <a style={{ fontSize: 'small' }}>
                Don't have an account yet? Register
              </a>
            </Link>
            <Button type='submit' color='grape'>
              Login
            </Button>
          </Stack>
        </form>
      </Center>
    </>
  );
};
