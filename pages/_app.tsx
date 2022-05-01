import { useState } from 'react';

import { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme,
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
