<script lang="ts">
  import { onMount } from 'svelte';
  import MovieCard from '../_components/MovieCard.svelte';
  import type { PageProps } from './$types';
  import { TMDBHost } from '$lib/constants';
  import { PUBLIC_API_KEY } from '$env/static/public';
  import { debounce } from '$lib/utils';
  import LoadingOverlay from '../_components/LoadingOverlay.svelte';

  let { data }: PageProps = $props();
  let page = $state(data.page);
  let movies = $state(data.results);
  let isLoading = $state(false);

  async function fetchData(page: number) {
    const response = await fetch(
      `${TMDBHost}/trending/all/day?page=${page}&api_key=${PUBLIC_API_KEY}`
    );

    const data = await response.json();

    return data;
  }

  const debouncedFetchData = debounce(async () => {
    page++;
    const data = await fetchData(page);
    movies = [...movies, ...data.results];
    isLoading = false;
  }, 1000);

  async function handleWindowScroll() {
    const scrollingElement = document.scrollingElement || document.documentElement;

    const scrollTop = scrollingElement.scrollTop;
    const clientHeight = scrollingElement.clientHeight;
    const scrollHeight = scrollingElement.scrollHeight;

    if (Math.ceil(scrollTop + clientHeight) >= scrollHeight - 1) {
      isLoading = true;
      debouncedFetchData();
    }
  }

  onMount(() => {
    window.addEventListener('scroll', handleWindowScroll);

    // Cleanup the event listener when the component is destroyed
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  });
</script>

<main class="px-6">
  <h1 class="pt-20 text-xl font-semibold">Trending Movies</h1>

  {data.total_results} Movies

  <div class="mt-8 grid grid-cols-2 gap-4">
    {#each movies as movie (movie.id)}
      <MovieCard {movie} />
    {/each}
  </div>

  {#if isLoading}
    <LoadingOverlay />
  {/if}
</main>
