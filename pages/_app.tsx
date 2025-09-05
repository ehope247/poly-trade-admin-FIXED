import '@/styles/globals.css'; // Use the alias for styles
import type { AppProps } from 'next/app';
import AdminLayout from '@/components/AdminLayout'; // Use the alias for components

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AdminLayout>
      <Component {...pageProps} />
    </AdminLayout>
  );
}

export default MyApp;