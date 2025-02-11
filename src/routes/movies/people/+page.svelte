<script lang="ts">
  import type { PageProps } from './$types';
  import Button from '$lib/components/ui/button/button.svelte';
  import { goto } from '$app/navigation';

  let { data }: PageProps = $props();
  let peopleList = $derived(data.results);

  function handleNavigation(direction: 'prev' | 'next') {
    const newPage = data.page + (direction === 'next' ? 1 : -1);

    if (newPage < 1) return;

    goto(`/movies/people?page=${newPage}`, { noScroll: true });
  }

  const handlePrev = () => handleNavigation('prev');
  const handleNext = () => handleNavigation('next');
</script>

<h1 class="pt-20">Popular People</h1>
<p>{data.total_results} people</p>

<div class="mt-8 grid grid-cols-2 gap-4">
  {#each peopleList as person (person.id)}
    <button
      type="button"
      onclick={() => goto(`/movies/people/${person.id}`)}
      class="cursor-pointer"
      aria-label={`View details for ${person.name}`}
    >
      <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} />
      <p>{person.name}</p>
    </button>
  {/each}
</div>

<div class="mt-8 flex items-center justify-center gap-4">
  <Button onclick={handlePrev}>Prev</Button>
  <div>{data.page}</div>
  <Button onclick={handleNext}>Next</Button>
</div>
