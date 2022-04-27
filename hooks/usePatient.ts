import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { fetchPatientById } from '../lib/API';

export default () => {
  const router = useRouter();
  const id = getCookie('user');

  const [data, setData] = useState<any>({});
  const [isRedirect, setRedirect] = useState(false);

  useEffect(() => {
    if (id === undefined) {
      router.push('/login');
      setRedirect(true);
      return;
    }

    fetchPatientById(id as string)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return [data, isRedirect];
};
