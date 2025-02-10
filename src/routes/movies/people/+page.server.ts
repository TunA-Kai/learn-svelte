import type { PageServerLoad } from './$types';
import { SECRET_API_KEY } from '$env/static/private';
import type { Person } from '$lib/types';
import { TMDBHost } from '$lib/constants';

export const load: PageServerLoad = async (params) => {
  const page = params.url.searchParams.get('page') || '1';
  const response = await fetch(`${TMDBHost}/person/popular?page=${page}&api_key=${SECRET_API_KEY}`);

  const data = (await response.json()) as {
    page: number;
    results: Person[];
    total_pages: number;
    total_results: number;
  };

  return data;
};
