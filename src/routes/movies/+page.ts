import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?page=1&api_key=14e5dd30af4a52d720be8f49e3d12414`
  );
  const data = await response.json();

  return {
    movieList: data.results
  };
};
