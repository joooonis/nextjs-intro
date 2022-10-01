import Head from 'next/head';
import { useEffect, useState } from 'react';
import Seo from '../component/Seo';

export default function Home() {
  const [movies, setMovies] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/movies`);
      const { results } = await response.json();
      setMovies(results);
    })();
  }, []);

  return (
    <div>
      <Seo title='Home' />
      {!movies && <h4>Loading...</h4>}
      {movies?.map((movie) => (
        <div key={movie.id}>
          <h4>{movie.original_title}</h4>
        </div>
      ))}
    </div>
  );
}
