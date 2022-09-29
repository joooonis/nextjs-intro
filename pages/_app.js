import NavBar from '../component/NavBar';
import '../styles/globals.css'; // _app.js에서 밖에 import 할 수 없습니다.

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <span>수면 아래에서 일어나고 있움...</span>
      <style jsx global>{`
        h1 {
          color: forestgreen;
        }
      `}</style>
    </>
  );
}
