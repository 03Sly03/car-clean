import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider, useSession } from 'next-auth/react';
import { NextComponentType } from 'next';
import { useRouter } from 'next/router';

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean };
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

type Props = {
  children: JSX.Element | JSX.Element[];
};

function Auth({ children }: Props) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=Veuillez vous connecter');
    },
  });
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
}
