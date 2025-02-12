import type { PageServerLoad } from './$types';
import { SECRET_API_KEY } from '$env/static/private';
import { TMDBHost } from '$lib/constants';
import type { Movie, Person } from '$lib/types';

interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

const fetchTMDBData = async (type: string, query: string) => {
  const url = `${TMDBHost}/search/${type}?query=${query}&api_key=${SECRET_API_KEY}`;
  const response = await fetch(url);
  return response.json();
};

export const load: PageServerLoad = async (params) => {
  const query = params.url.searchParams.get('query') || '';
  const [movies, tvShows, people] = (await Promise.all([
    fetchTMDBData('movie', query),
    fetchTMDBData('tv', query),
    fetchTMDBData('person', query)
  ])) as [TMDBResponse<Movie>, TMDBResponse<Movie>, TMDBResponse<Person>];

  return { movies, tvShows, people };
};
