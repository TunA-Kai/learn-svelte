<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import type { PageProps } from './$types';
  import MovieCard from '../../../_components/MovieCard.svelte';

  let { data }: PageProps = $props();
  const allMovies = $derived(data.combinedCredits.cast);
  const peopleId = $derived(page.params.peopleId);
</script>

<button class="mt-20" onclick={() => goto(`/movies/people/${peopleId}`)}>Back</button>

<div class="mt-4 grid grid-cols-2 gap-4">
  {#each allMovies as movie}
    <MovieCard {movie} />
  {/each}
</div>
