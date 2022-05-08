// Next and React
import Head from 'next/head';
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
import { checkPasswordValidity, makeRegisterCall } from '../../lib/utils';
import dayjs from 'dayjs';

export default () => {
  // Color of the key icon depending on if there is an error
  const [keyColor, setKeyColor] = useState('#adb6bd');
  const [atColor, setAtColor] = useState('#adb6bd');

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
            // passwordAgain is not needed for the API call
            const { passwordAgain, ...reqBody } = values;

            if (
              checkPasswordValidity(
                values.password,
                passwordAgain,
                setKeyColor,
              ) === 'ERROR'
            )
              return;

            // Timezone and the time are not needed
            reqBody.dateOfBirth = dayjs(reqBody.dateOfBirth).format(
              'DD.MM.YYYY',
            );

            makeRegisterCall('user', reqBody, setAtColor);
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
                allowFreeInput
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
