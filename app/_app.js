import { useEffect, useState } from 'react';
import Loading from './Loading';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <Component {...pageProps} />;
}

export default MyApp;