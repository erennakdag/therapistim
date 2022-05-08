import { Button, Center, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useState } from 'react';
import { At, Key } from 'tabler-icons-react';
import { updateForgottenPassword } from '../lib/API';
import { checkPasswordValidity } from '../lib/utils';

export default () => {
  const [keyColor, setKeyColor] = useState('#adb6bd');

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      passwordAgain: '',
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        // TODO: validate something about the patient

        const { passwordAgain, ...data } = values;

        if (
          checkPasswordValidity(data.password, passwordAgain, setKeyColor) ===
          'ERROR'
        )
          return;

        // TODO: Change API call for therapist
        updateForgottenPassword(data)
          .then(() => alert('Successfully updated your password!'))
          .catch(console.log);
      })}
    >
      <TextInput
        placeholder='Email'
        label='Your Email'
        type='email'
        radius='md'
        icon={<At />}
        required
        {...form.getInputProps('email')}
      />
      <PasswordInput
        label='New Password'
        placeholder='New Password'
        radius='md'
        icon={<Key color={keyColor} />}
        required
        {...form.getInputProps('password')}
      />
      <PasswordInput
        label='New Password Again'
        placeholder='New Password Again'
        radius='md'
        icon={<Key />}
        required
        {...form.getInputProps('passwordAgain')}
      />
      <Center>
        <Button type='submit' style={{ marginTop: '10px' }}>
          Submit
        </Button>
      </Center>
    </form>
  );
};
