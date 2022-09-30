import Layout from '../component/LayOut';
import '../styles/globals.css'; // _app.js에서 밖에 import 할 수 없습니다.

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
