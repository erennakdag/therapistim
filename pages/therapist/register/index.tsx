import {
  Card,
  Center,
  PasswordInput,
  Stack,
  Textarea,
  TextInput,
} from '@mantine/core';
import { At, Id, Key, Phone } from 'tabler-icons-react';

export default () => {
  return (
    <Center>
      <form>
        <Card>
          <Stack>
            <TextInput
              placeholder='Your name'
              label='Full name'
              description='Include your titles, like Dr. med. or Mr.'
              radius='md'
              required
              autoComplete='off'
              icon={<Id />}
              style={{ width: '30vw' }}
              //   {...form.getInputProps('name')}
            />
            <TextInput
              placeholder='Your email'
              label='Email'
              type='email'
              radius='md'
              autoComplete='off'
              icon={<At /*color={atColor}*/ />}
              required
              //   {...form.getInputProps('email')}
            />
            <PasswordInput
              placeholder='Password'
              label='Password'
              radius='md'
              autoComplete='off'
              required
              icon={<Key /*color={keyColor}*/ />}
              // {...form.getInputProps('password')}
            />
            <PasswordInput
              placeholder='Password Again'
              label='Password Again'
              radius='md'
              autoComplete='off'
              required
              icon={<Key /*color={keyColor}*/ />}
              // {...form.getInputProps('passwordAgain')}
            />
            <TextInput
              placeholder='Phone Number'
              label='Phone Number'
              type='tel'
              radius='md'
              required
              icon={<Phone />}
              //   {...form.getInputProps('phone')}
            />
            <Textarea
              placeholder='Your biography or description of your service'
              label='Bio'
              radius='md'
              required
              //   icon={<Phone />}
              // {...form.getInputProps('bio')}
            />
          </Stack>
        </Card>
      </form>
    </Center>
  );
};

/* MODEL FOR THE THERAPIST TABLE
model Therapist {
  id                      String    @id @default(uuid())
  DONE: name                    String
  DONE: email                   String    @unique
  DONE: password                String
  DONE: phone                   String
  DONE: bio                     String
  TODO: address                 String
  TODO: institutionName         String?
  TODO: languages               Json
  TODO: specialties             Json
  TODO: canWriteMedication      Boolean
  TODO: website                 String?
  TODO: location                String?
  TODO: acceptsPrivateInsurance Boolean?
}
*/
