// Next and React
import Head from 'next/head';
import useSWR from 'swr';
import { getCookie, removeCookies } from 'cookies-next';

// UI
import { Button } from '@mantine/core';

// API
import API, { urls } from '../../lib/API';

export default () => {
  const id = getCookie('user') as string;

  // TODO: Find a better way to redirect
  if (id === undefined) {
    window.location.href = '/login';
  }

  const { data, error } = useSWR(urls.get.GET_PATIENTS + id, API.get);

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
      <Button onClick={() => removeCookies('user')}>Logout</Button>
    </>
  );
};
