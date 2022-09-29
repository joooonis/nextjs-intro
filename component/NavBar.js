import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavBar() {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      <Link href='/'>
        <a
          className='home'
          style={{ color: router.pathname === '/' ? 'purple' : 'orange' }}>
          Home
        </a>
      </Link>
      <Link href='/about'>
        <a
          style={{ color: router.pathname === '/about' ? 'purple' : 'orange' }}>
          About
        </a>
      </Link>
    </div>
  );
}
