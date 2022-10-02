import Head from 'next/head';
import { useEffect, useState } from 'react';
import Seo from '../component/Seo';

export default function Home({ results }) {
  const [movies, setMovies] = useState();

  return (
    <div>
      <Seo title='Home' />
      {results?.map((movie) => (
        <div key={movie.id}>
          <h4>{movie.original_title}</h4>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const { results } = await (
    await fetch('http://localhost:3000//api/movies')
  ).json();
  return {
    props: {
      results,
    },
  };
}
