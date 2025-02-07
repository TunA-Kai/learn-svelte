import type { PageServerLoad } from './$types';
import { SECRET_API_KEY } from '$env/static/private';
import type { Movie } from '$lib/types';
import { TMDBHost } from '$lib/constants';

export const load: PageServerLoad = async () => {
  const response = await fetch(`${TMDBHost}/trending/all/day?page=1&api_key=${SECRET_API_KEY}`);

  const data = (await response.json()) as {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  };

  return { ...data };
};
