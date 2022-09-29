import Link from 'next/link';

export default function NavBar() {
  return (
    <div>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Link href='/about'>
        <a>About</a>
      </Link>
    </div>
  );
}
