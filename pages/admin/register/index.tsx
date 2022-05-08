import {
  Card,
  Center,
  Checkbox,
  PasswordInput,
  Stack,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/hooks';

import Head from 'next/head';
import { useState } from 'react';
import { At, Id, Key, Phone } from 'tabler-icons-react';

import { checkPasswordValidity, makeRegisterCall } from '../../../lib/utils';

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
      bio: '',
      institutionName: undefined,
      adress: '',
      website: undefined,
      languages: [''],
      specialties: [''],
      latitude: 0,
      longitude: 0,
      canWriteMedication: false,
      acceptsPrivateInsurance: false,
    },
  });

  return (
    <>
      <Head>
        <title>Therapistim | Register as a Therapist</title>
      </Head>

      <Center>
        <form
          onSubmit={form.onSubmit((values) => {
            const { passwordAgain, ...reqBody } = values;
            if (
              checkPasswordValidity(
                values.password,
                passwordAgain,
                setKeyColor,
              ) === 'ERROR'
            )
              return;
            makeRegisterCall('therapist', reqBody, setAtColor);
          })}
        >
          <Card
            style={{ margin: '10px', borderRadius: '30px' }}
            shadow='lg'
            p='lg'
          >
            <Stack>
              <Title>REGISTER AS A THERAPIST</Title>
              <TextInput
                placeholder='Your name'
                label='Full name'
                description='Include your titles, like Dr. med. or Mr.'
                radius='md'
                required
                autoComplete='off'
                icon={<Id />}
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
              <Textarea
                placeholder='Your biography or description of your service'
                label='Bio'
                radius='md'
                required
                //   icon={<Phone />}
                {...form.getInputProps('bio')}
              />
              <TextInput
                placeholder='Institution Name'
                label='Institution Name'
                description='This is optional. Only enter a name if you are affiliated with an institution like a hospital etc.'
                radius='md'
                // icon={<Phone />}
                {...form.getInputProps('institutionName')}
              />
              <TextInput
                placeholder='Example Street 42, 42069 Example City'
                label='Adress'
                description='Please write your full adress'
                radius='md'
                required
                {...form.getInputProps('adress')}
              />
              <TextInput
                placeholder='Website'
                label='Website'
                description='This is optional. Only enter a website url if you are the owner.'
                radius='md'
                // icon={<Phone />}
                {...form.getInputProps('website')}
              />
              <Checkbox
                label='Are you allowed to write medication? (e.g. antidepressants, benzodiazepine...)'
                {...form.getInputProps('canWriteMedication')}
              />
              <Checkbox
                label='Do you accept patients with private insurance or no insurance (if they pay themselves)?'
                {...form.getInputProps('acceptsPrivateInsurance')}
              />
            </Stack>
          </Card>
        </form>
      </Center>
    </>
  );
};

/* MODEL FOR THE THERAPIST TABLE
model Therapist {
  id
  DONE: name
  DONE: email
  DONE: password 
  DONE: phone
  DONE: bio
  DONE: address
  DONE: institutionName
TODO: languages
TODO: specialties  
  DONE: canWriteMedication
  DONE: website
  DONE: acceptsPrivateInsurance
}
*/
