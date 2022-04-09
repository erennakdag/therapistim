import {
  Center,
  Title,
  TextInput,
  PasswordInput,
  Select,
  Switch,
  Stack,
  Button,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import Head from 'next/head';
import { useState } from 'react';
import { Id, At, Key, Phone, Cake, Man } from 'tabler-icons-react';
import API, { urls } from '../../lib/API';

export default () => {
  const [keyColor, setKeyColor] = useState('grey');

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordAgain: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
    },
  });

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Center style={{ width: '100%', marginTop: '5vh' }}>
        <form
          onSubmit={form.onSubmit((values) => {
            if (values.password !== values.passwordAgain) {
              setKeyColor('red');
              return alert('Password have to match!');
            }

            if (
              values.password.match(
                /^(?=(.*[a-z])+)(?=(.*[A-Z])+)(?=(.*[0-9])+)(?=(.*[!@#$%^&*()\-__+.])+).{8,}$/gm,
              ) === null
            ) {
              setKeyColor('red');
              return alert(
                'Password have to be at least 8 characters long and contain at least one number, one uppercase letter, one lowercase letter, and one special character.',
              );
            }

            const { passwordAgain, ...reqBody } = values;
            API.post(urls.CREATE_NEW_PATIENT, reqBody)
              .then((resp) => {
                console.log(resp.ok);
                window.location.href = '/';
              })
              .catch((error) => {
                console.log(error);
              });
          })}
        >
          <Stack>
            <Title order={1}>REGISTER</Title>
            <TextInput
              placeholder='Your name'
              label='Full name'
              radius='md'
              required
              autoComplete='off'
              icon={<Id />}
              style={{ width: '50vw' }}
              {...form.getInputProps('name')}
            />
            <TextInput
              placeholder='Your email'
              label='Email'
              type='email'
              radius='md'
              autoComplete='off'
              icon={<At />}
              required
              {...form.getInputProps('email')}
            />
            <PasswordInput
              placeholder='Password'
              label='Password'
              radius='md'
              autoComplete='off'
              required
              icon={<Key color={keyColor} />}
              {...form.getInputProps('password')}
            />
            <PasswordInput
              placeholder='Password Again'
              label='Password Again'
              radius='md'
              autoComplete='off'
              required
              icon={<Key color={keyColor} />}
              {...form.getInputProps('passwordAgain')}
            />
            <TextInput
              placeholder='Phone Number'
              label='Phone Number'
              type='tel'
              radius='md'
              required
              icon={<Phone />}
              {...form.getInputProps('phone')}
            />
            <DatePicker
              placeholder='Date of Birth'
              label='Date of Birth'
              required
              icon={<Cake />}
              {...form.getInputProps('dateOfBirth')}
            />
            <Select
              label='Gender'
              placeholder='Gender'
              dropdownPosition='top'
              icon={<Man />}
              required
              data={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
                { value: 'Non-Binary', label: 'Non-Binary/Diverse' },
              ]}
              {...form.getInputProps('gender')}
            />
            <Switch label='Agree to our policy' required color='grape' />
            <Button type='submit' color='grape'>
              Submit
            </Button>
          </Stack>
        </form>
      </Center>
    </>
  );
};
