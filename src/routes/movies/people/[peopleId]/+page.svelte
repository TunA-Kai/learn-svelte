<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import type { PageProps } from './$types';
  import MovieCard from '../../_components/MovieCard.svelte';
  import Button from '$lib/components/ui/button/button.svelte';

  let { data }: PageProps = $props();
  const detail = $derived(data.personDetail);
  const credits = $derived(data.combinedCredits.cast.slice(0, 10));
  const peopleId = $derived(page.params.peopleId);
</script>

<div class="pt-20"></div>

<button onclick={() => goto('/movies/people')}>Back</button>

<h1>People {peopleId}</h1>

<img src={`https://image.tmdb.org/t/p/w500${detail.profile_path}`} alt={detail.name} />
<p>{detail.name}</p>
<p>{detail.biography}</p>

<h2 class="mt-10">Known For</h2>
<div class="mt-4 grid grid-cols-2 gap-4">
  {#each credits as credit (credit.id)}
    <MovieCard movie={credit} />
  {/each}
</div>

<Button class="mx-auto mt-4 block w-fit" href={`/movies/people/${peopleId}/casting`}>
  View All
</Button>
