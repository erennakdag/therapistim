import { Button, Center, PasswordInput, TextInput } from '@mantine/core';
import { Key, Phone } from 'tabler-icons-react';

export default () => {
  return (
    <form>
      <PasswordInput
        label='Old Password'
        placeholder='Old Password'
        radius='md'
        icon={<Key />}
        required
        // {...form.getInputProps('passwordOld')}
      />
      <PasswordInput
        label='New Password'
        placeholder='New Password'
        radius='md'
        icon={<Key />}
        // {...form.getInputProps('password')}
      />
      <PasswordInput
        label='New Password Again'
        placeholder='New Password Again'
        radius='md'
        icon={<Key />}
        // {...form.getInputProps('passwordAgain')}
      />
      <TextInput
        placeholder='Phone Number'
        label='Phone Number'
        type='tel'
        radius='md'
        icon={<Phone />}
        // {...form.getInputProps('phone')}
      />
      <Center style={{ marginTop: '10px' }}>
        <Button>Submit</Button>
      </Center>
    </form>
  );
};
