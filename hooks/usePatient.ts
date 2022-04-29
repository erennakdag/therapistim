import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { fetchPatientById } from '../lib/API';
import { IPatientData } from '../lib/types';

export default () => {
  /* 
    We deal with the router here 
    because this hook is guaranteed to run on the browser
  */
  const router = useRouter();
  const id = getCookie('user');

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({} as IPatientData);
  const [isRedirect, setRedirect] = useState(false);

  useEffect(() => {
    if (id === undefined) {
      router.push('/login');
      setRedirect(true);
      setLoading(false);
      return;
    }

    fetchPatientById(id as string)
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return { data, isLoading, isRedirect };
};
