import NavBar from '../component/NavBar';

export default function Home() {
  return (
    <div>
      <NavBar />
      <h1 className='active'>Home</h1>
      <div>
        <h2 className='active'>Home</h2>

        <style jsx>{`
          nav {
            background-color: forestgreen;
          }

          .active {
            color: hotpink;
          }
        `}</style>
      </div>
    </div>
  );
}
