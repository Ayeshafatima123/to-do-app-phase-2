import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/auth';
import { ThemeProvider } from '../context/theme';
import '../../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;