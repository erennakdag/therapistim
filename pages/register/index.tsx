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
import { Id, At, Key, Phone, Cake, Man } from 'tabler-icons-react';
import API, { urls } from '../../lib/API';

export default () => {
  const form = useForm({
    initialValues: {
      name: 'Max Mustermann',
      email: 'max.mustermann@gmail.com',
      password: 'mustermann123',
      phone: '+4917631313131',
      dateOfBirth: '01.04.1980',
      gender: 'Male',
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
            API.post(urls.CREATE_NEW_PATIENT, values)
              .then((resp) => {
                console.log(resp.ok);
              })
              .catch((error) => {
                console.log(error);
              });
            window.location.href = '/';
          })}
        >
          <Stack>
            <Title order={1}>REGISTER</Title>
            <TextInput
              placeholder="Your name"
              label="Full name"
              radius="md"
              required
              icon={<Id />}
              style={{ width: '50vw' }}
              {...form.getInputProps('name')}
            />
            <TextInput
              placeholder="Your email"
              label="Email"
              type="email"
              radius="md"
              icon={<At />}
              required
              {...form.getInputProps('email')}
            />
            <PasswordInput
              placeholder="Password"
              label="Password"
              radius="md"
              required
              icon={<Key />}
              {...form.getInputProps('password')}
            />
            <PasswordInput
              placeholder="Password Again"
              label="Password Again"
              radius="md"
              required
              icon={<Key />}
            />
            <TextInput
              placeholder="Phone Number"
              label="Phone Number"
              type="tel"
              radius="md"
              required
              icon={<Phone />}
              {...form.getInputProps('phone')}
            />
            <DatePicker
              placeholder="Date of Birth"
              label="Date of Birth"
              required
              icon={<Cake />}
              {...form.getInputProps('dateOfBirth')}
            />
            <Select
              label="Gender"
              placeholder="Gender"
              dropdownPosition="top"
              icon={<Man />}
              required
              data={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
                { value: 'Non-Binary', label: 'Non-Binary/Diverse' },
              ]}
              {...form.getInputProps('gender')}
            />
            <Switch label="Agree to our policy" required color="grape" />
            <Button type="submit" color="grape">
              Submit
            </Button>
          </Stack>
        </form>
      </Center>
    </>
  );
};
