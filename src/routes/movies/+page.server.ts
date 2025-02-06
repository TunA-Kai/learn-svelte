import type { PageServerLoad } from './$types';
import { SECRET_API_KEY } from '$env/static/private';
import { fetchMovies } from '$lib/utils';
import type { Movie } from '$lib/types';

const fetchData = (endpoint: string) => fetchMovies<Movie[]>({ endpoint, apiKey: SECRET_API_KEY });

export const load: PageServerLoad = async () => {
  const [popularList, topRatedList, upcomingList] = await Promise.all([
    fetchData('popular'),
    fetchData('top_rated'),
    fetchData('upcoming')
  ]);

  return { popularList, topRatedList, upcomingList };
};
