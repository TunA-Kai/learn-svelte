<script lang="ts">
  import type { PageProps } from './$types';
  import MovieCard from '../_components/MovieCard.svelte';
  import * as Tabs from '$lib/components/ui/tabs';
  import type { Movie } from '$lib/types';

  const TABS = {
    MOVIES: 'movies',
    TVSHOWS: 'tvshows',
    PEOPLE: 'people'
  };

  let { data }: PageProps = $props();
  const movies = $derived(data.movies.results);
  const tvshows = $derived(data.tvShows.results);
  const people = $derived(data.people.results);
</script>

<h1 class="mb-4 mt-20 text-xl font-semibold">Search Result</h1>

<Tabs.Root value={TABS.MOVIES}>
  <Tabs.List>
    <Tabs.Trigger value={TABS.MOVIES}>Movies ({data.movies.total_results})</Tabs.Trigger>
    <Tabs.Trigger value={TABS.TVSHOWS}>TV Shows ({data.tvShows.total_results})</Tabs.Trigger>
    <Tabs.Trigger value={TABS.PEOPLE}>People ({data.people.total_results})</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value={TABS.MOVIES}>{@render tabs(movies)}</Tabs.Content>
  <Tabs.Content value={TABS.TVSHOWS}>{@render tabs(tvshows)}</Tabs.Content>
  <Tabs.Content value={TABS.PEOPLE}>
    <div class="mt-8 grid grid-cols-2 gap-4">
      {#each people as person (person.id)}
        <div>
          <img
            src={person.profile_path
              ? `https://image.tmdb.org/t/p/w185_and_h278_face${person.profile_path}`
              : '/person-placeholder.jpg'}
            alt={person.name}
            class="rounded-lg"
          />
          <h2 class="mt-2 text-lg font-semibold">{person.name}</h2>
        </div>
      {/each}
    </div>
  </Tabs.Content>
</Tabs.Root>

{#snippet tabs(movies: Movie[])}
  <div class="mt-8 grid grid-cols-2 gap-4">
    {#each movies as movie (movie.id)}
      <MovieCard {movie} />
    {/each}
  </div>
{/snippet}
