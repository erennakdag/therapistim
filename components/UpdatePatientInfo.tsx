import { Button, Center, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Key, Phone } from 'tabler-icons-react';
import { updatePatientById } from '../lib/API';
import { IPatientUpdate } from '../lib/types';
import { isPasswordNotAcceptable } from '../lib/utils';

export default ({ id }: { id: string }) => {
  const form = useForm({
    initialValues: {
      passwordOld: '',
      password: '',
      passwordAgain: '',
      phone: '',
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        const { passwordOld, password, passwordAgain, phone } = values;
        const reqBody: IPatientUpdate = { passwordOld };

        // Check if new password checks out
        if (
          password !== '' &&
          !isPasswordNotAcceptable(password) &&
          password === passwordAgain
        ) {
          reqBody.password = password;
        }

        // check if user entered a new phone number
        if (phone !== '') {
          reqBody.phone = phone;
        }

        updatePatientById(id, reqBody)
          .then(() => alert('Succesfully updated your personal info!'))
          .catch((err) => {
            const status = err.statusCode;
            if (status === 401) {
              alert('Your old password is wrong, please try again!');
            } else if (status === 404) {
              alert(
                'Something went wrong! We cannot find your records. Sorry :(',
              );
            }
          });
      })}
    >
      <PasswordInput
        label='Old Password'
        placeholder='Old Password'
        radius='md'
        icon={<Key />}
        required
        {...form.getInputProps('passwordOld')}
      />
      <PasswordInput
        label='New Password'
        placeholder='New Password'
        radius='md'
        icon={<Key />}
        {...form.getInputProps('password')}
      />
      <PasswordInput
        label='New Password Again'
        placeholder='New Password Again'
        radius='md'
        icon={<Key />}
        {...form.getInputProps('passwordAgain')}
      />
      <TextInput
        placeholder='Phone Number'
        label='Phone Number'
        type='tel'
        radius='md'
        icon={<Phone />}
        {...form.getInputProps('phone')}
      />
      <Center style={{ marginTop: '10px' }}>
        <Button type='submit'>Submit</Button>
      </Center>
    </form>
  );
};
