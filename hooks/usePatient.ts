import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import API, { urls } from '../lib/API';

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

    API.get(urls.get.GET_PATIENTS + id)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return [data, isRedirect];
};
