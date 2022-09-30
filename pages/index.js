import Head from 'next/head';
import Seo from '../component/Seo';

export default function Home() {
  return (
    <div>
      <Seo title='Home' />
      <h1 className='active'>Home</h1>
    </div>
  );
}
