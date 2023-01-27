import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider, useSession } from 'next-auth/react';
import { NextComponentType } from 'next';
import { useRouter } from 'next/router';

type CustomAppProps = AppProps & {
  Component: NextComponentType & {
    auth?: {
      isAuth?: boolean;
      adminOnly: boolean;
    };
  };
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth adminOnly={Component.auth.adminOnly}>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

type Props = {
  adminOnly: boolean;
  children: JSX.Element | JSX.Element[];
};

function Auth({ children, adminOnly }: Props) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=Veuillez vous connecter');
    },
  });
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (adminOnly && !session.user.isAdmin) {
    router.push('/unauthorized?message=admin login required');
  }
  return <>{children}</>;
}
