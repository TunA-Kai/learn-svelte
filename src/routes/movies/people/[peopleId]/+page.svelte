<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import type { PageProps } from './$types';
  import MovieCard from '../../_components/MovieCard.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { ArrowLeftIcon } from 'lucide-svelte';

  let { data }: PageProps = $props();
  const detail = $derived(data.personDetail);
  const credits = $derived(data.combinedCredits.cast.slice(0, 10));
  const peopleId = $derived(page.params.peopleId);
</script>

<div class="absolute inset-0 -z-10 h-[300px]">
  <img class="h-full object-cover" src="/person-backdrop.jpg" alt="" />
  <div class="absolute top-0 h-full w-full [background:rgba(5,6,7,.3)]"></div>
</div>

<button class="mt-20 flex gap-2" onclick={() => goto('/movies/people')}>
  <ArrowLeftIcon /> Back
</button>

<img
  class="mt-12 h-[200px] w-[150px] object-cover"
  src={`https://image.tmdb.org/t/p/w300${detail.profile_path}`}
  alt={detail.name}
/>
<p class="mt-2 text-xl font-semibold">{detail.name}</p>
<p class="mt-2 text-sm">{detail.biography}</p>

<h2 class="mt-10 text-xl font-semibold">Known For</h2>
<div class="mt-4 grid grid-cols-2 gap-4">
  {#each credits as credit (credit.id)}
    <MovieCard movie={credit} />
  {/each}
</div>

<Button class="mx-auto mt-4 block w-fit" href={`/movies/people/${peopleId}/casting`}>
  View All
</Button>
