import {
  Button,
  Card,
  Center,
  Select,
  Stack,
  Switch,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { searchTherapist } from '../lib/API';

const Home: NextPage = () => {
  const form = useForm({
    initialValues: {
      name: '',
      adress: '',
      radius: undefined,
      languages: '',
      specialties: '',
      acceptsPrivateInsurance: false,
      canWriteMedication: false,
    },
  });

  const [therapistList, setTherapistList] = useState<any>([]);

  return (
    <div>
      <Head>
        <title>Therapistim</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Center>
        <Link href='/profile'>
          <a>Profile</a>
        </Link>
        <form
          onSubmit={form.onSubmit((values) => {
            searchTherapist(
              Object.entries(values).filter(
                (value) =>
                  value[1] !== '' &&
                  value[1] !== undefined &&
                  value[1] !== false,
              ),
            ).then(setTherapistList);
          })}
        >
          <Stack>
            <TextInput
              placeholder='Search by name...'
              label='Search'
              radius='md'
              autoComplete='off'
              // style={{ width: '30vw' }}
              {...form.getInputProps('name')}
            />
            <TextInput
              placeholder='Enter your adress'
              label='Adress'
              radius='md'
              autoComplete='off'
              // style={{ width: '30vw' }}
              {...form.getInputProps('adress')}
            />
            <TextInput
              placeholder='Radius'
              description='How far apart?'
              label='Distance'
              radius='md'
              type='number'
              autoComplete='off'
              // style={{ width: '30vw' }}
              {...form.getInputProps('radius')}
            />
            <Select
              label='Languages'
              placeholder='Which Language should your therapist speak'
              dropdownPosition='top'
              data={[
                { value: 'English', label: 'English' },
                { value: 'German', label: 'German' },
                { value: 'Turkish', label: 'Turkish' },
              ]}
              {...form.getInputProps('languages')}
            />
            <Select
              label='Specialties'
              placeholder='A specialty your therapist should have'
              dropdownPosition='top'
              data={[
                { value: 'Depression', label: 'Depression' },
                { value: 'Anxiety', label: 'Anxiety' },
                { value: 'PTSD', label: 'PTSD' },
                { value: 'Eating Disorders', label: 'Eating Disorders' },
              ]}
              {...form.getInputProps('specialties')}
            />
            <Switch
              label='Should accept private insurance?'
              color='grape'
              {...form.getInputProps('acceptsPrivateInsurance')}
            />
            <Switch
              label='Should be able to write medication?'
              color='grape'
              {...form.getInputProps('canWriteMedication')}
            />
            <Button type='submit'>Search</Button>
          </Stack>
        </form>
        <Stack>
          {therapistList.map((therapist: any, index: number) => {
            return (
              <div key={index}>
                <a href={`http://localhost:3000/therapists/${therapist.id}`}>
                  {therapist.name}
                </a>
              </div>
            );
          })}
        </Stack>
      </Center>
    </div>
  );
};

export default Home;
