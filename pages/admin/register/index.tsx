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
import Head from 'next/head';
import { At, Id, Key, Phone } from 'tabler-icons-react';

export default () => {
  // TODO: useForm and make API call
  return (
    <>
      <Head>
        <title>Therapistim | Register as a Therapist</title>
      </Head>

      <Center>
        <form>
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
              {/* TODO: Adress */}
              <TextInput
                placeholder='Institution Name'
                label='Institution Name'
                description='This is optional. Only enter a name if you are affiliated with an institution like a hospital etc.'
                radius='md'
                // icon={<Phone />}
                //   {...form.getInputProps('institutionName')}
              />
              <TextInput
                placeholder='Website'
                label='Website'
                description='This is optional. Only enter a website url if you are the owner.'
                radius='md'
                // icon={<Phone />}
                //   {...form.getInputProps('institutionName')}
              />
              <Checkbox label='Are you allowed to write medication? (e.g. antidepressants, benzodiazepine...)' />
              <Checkbox label='Do you accept patients with private insurance or no insurance (if they pay themselves)?' />
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
TODO: address                 
  DONE: institutionName         
TODO: languages               
TODO: specialties             
  DONE: canWriteMedication      
  DONE: website                 
TODO: location                
  DONE: acceptsPrivateInsurance 
}
*/
