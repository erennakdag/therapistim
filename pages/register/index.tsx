// Next and React
import Head from 'next/head';
import { useRouter } from 'next/router';
import { setCookies } from 'cookies-next';
import { useState } from 'react';

// UI
import {
  Center,
  Title,
  TextInput,
  PasswordInput,
  Select,
  Switch,
  Stack,
  Button,
  Card,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { Id, At, Key, Phone, Cake, Man } from 'tabler-icons-react';

// API
import { createPatient } from '../../lib/API';

export default () => {
  // Color of the key icon depending on if there is an error
  const [keyColor, setKeyColor] = useState('#adb6bd');
  const [atColor, setAtColor] = useState('#adb6bd');
  const router = useRouter();

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
        <title>Register | Therapistim</title>
      </Head>
      <Center style={{ width: '100%', marginTop: '5vh' }}>
        <form
          onSubmit={form.onSubmit((values) => {
            if (values.password !== values.passwordAgain) {
              setKeyColor('red');
              return alert('Password have to match!');
            }

            /* Regex Checks for: 
              1. lowercase and uppercase letters
              2. digits
              3. special characters
              4. at least 8 characters long
            */
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

            // passwordAgain is not needed for the API call
            const { passwordAgain, ...reqBody } = values;
            createPatient(reqBody)
              .then((res) => {
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
                );
                // succesful registration -> redirect to homepage
                router.push('/');
              })
              .catch((error) => {
                if (error.statusCode === 409) {
                  alert('This email already exists!');
                  setAtColor('red');
                }
              });
          })}
        >
          <Card shadow='lg' p='lg'>
            <Stack>
              <Title order={1}>REGISTER</Title>
              <TextInput
                placeholder='Your name'
                label='Full name'
                radius='md'
                required
                autoComplete='off'
                icon={<Id />}
                style={{ width: '30vw' }}
                {...form.getInputProps('name')}
              />
              <TextInput
                placeholder='Your email'
                label='Email'
                type='email'
                radius='md'
                autoComplete='off'
                icon={<At color={atColor} />}
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
          </Card>
        </form>
      </Center>
    </>
  );
};
