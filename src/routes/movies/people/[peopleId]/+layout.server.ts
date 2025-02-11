import type { LayoutServerLoad } from './$types';
import { SECRET_API_KEY } from '$env/static/private';
import type { Actor, Movie } from '$lib/types';
import { TMDBHost } from '$lib/constants';

// NOTE: child page.server.ts need data from this one, so change file from page.server.ts to layout.server.ts

export const load: LayoutServerLoad = async (params) => {
  const peopleId = params.params.peopleId;
  const fetchPersonDetail = fetch(
    `${TMDBHost}/person/${peopleId}?append_to_response=images&api_key=${SECRET_API_KEY}`
  ).then((response) => response.json());

  const fetchCombinedCredits = fetch(
    `${TMDBHost}/person/${peopleId}/combined_credits?api_key=${SECRET_API_KEY}`
  ).then((response) => response.json());

  const [personDetailResponse, combinedCreditsResponse] = await Promise.all([
    fetchPersonDetail,
    fetchCombinedCredits
  ]);

  return {
    personDetail: personDetailResponse as Actor,
    combinedCredits: combinedCreditsResponse as { cast: Movie[]; crew: Movie[] }
  };
};
