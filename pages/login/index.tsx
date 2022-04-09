import Head from 'next/head';
import { useForm } from '@mantine/form';
import { At, Key } from 'tabler-icons-react';
import API, { urls } from '../../lib/API';
import {
  Center,
  Button,
  Stack,
  TextInput,
  PasswordInput,
  Title,
  Checkbox,
} from '@mantine/core';

export default () => {
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
            console.log(values);
          })}
        >
          <Stack>
            <Title>Login</Title>
            <TextInput
              name='email'
              label='Email'
              placeholder='Email'
              icon={<At />}
              style={{ width: '30vw' }}
              required
              {...form.getInputProps('email')}
            />
            <PasswordInput
              name='password'
              label='Password'
              placeholder='Password'
              icon={<Key />}
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
