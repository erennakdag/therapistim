import { Button, Center, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { At, Key } from 'tabler-icons-react';
import { updateForgottenPassword } from '../lib/API';
import { isPasswordNotAcceptable } from '../lib/utils';

export default () => {
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

        if (data.password !== passwordAgain) {
          return alert('Passwords do not match!');
        }
        if (isPasswordNotAcceptable(data.password)) {
          return alert(
            'Password have to be at least 8 characters long and contain at least one number, \
              one uppercase letter, one lowercase letter, and one special character.',
          );
        }
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
        icon={<Key />}
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
