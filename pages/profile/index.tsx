// Next and React
import Head from 'next/head';
import useSWR from 'swr';
import Router from 'next/router';
import { getCookie, removeCookies } from 'cookies-next';

// UI
import { Button } from '@mantine/core';

// API
import API, { urls } from '../../lib/API';

export default () => {
  const id = getCookie('user') as string;

  if (id === undefined) {
    Router.push('/login');
    return;
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
      <Button
        onClick={() => {
          removeCookies('user');
          Router.push('/login');
        }}
      >
        Logout
      </Button>
    </>
  );
};
