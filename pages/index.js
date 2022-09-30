import Head from 'next/head';
import { useEffect, useState } from 'react';
import Seo from '../component/Seo';

const API_KEY = '51a50e1e798cc339aa2a5af32624c0f9';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
      );
      const { results } = await response.json();
      setMovies(results);
    })();
  }, []);

  return (
    <div>
      <Seo title='Home' />
      {movies.map((movie) => (
        <div key={movie.id}>
          <h4>{movie.original_title}</h4>
        </div>
      ))}
    </div>
  );
}
