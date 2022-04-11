// Next and React
import Head from 'next/head';
import useSWR from 'swr';

// Hooks
import useSessionStorage from '../../hooks/useSessionStorage';

// UI
import { Button } from '@mantine/core';

// API
import API, { urls } from '../../lib/API';

export default () => {
  const id = useSessionStorage();

  if (id === null) {
    window.location.href = '/login';
  }

  const { data, error } = useSWR(
    urls.get.GET_PATIENTS + id?.substring(1, id.length - 1),
    API.get,
  );

  if (error || data === null) {
    return <div style={{ color: 'red' }}>An error occured</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div>{JSON.stringify(data)}</div>
      <Button onClick={() => sessionStorage.removeItem('user')}>Logout</Button>
    </>
  );
};
