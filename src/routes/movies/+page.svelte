<script lang="ts">
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import EmblaFade from 'embla-carousel-fade';
  import Autoplay from 'embla-carousel-autoplay';
  import type { PageProps } from './$types';
  import Button from '$lib/components/ui/button/button.svelte';

  const plugins = [EmblaFade(), Autoplay()];

  let { data }: PageProps = $props();
  const movieList = $derived(data.movieList);

  function createBackgroundPath(path: string) {
    return `https://image.tmdb.org/t/p/original${path}`;
  }

  function createPosterPath(path: string) {
    return `https://image.tmdb.org/t/p/w300_and_h450_face${path}`;
  }
</script>

<div class="overflow-hidden" use:emblaCarouselSvelte={{ plugins, options: {} }}>
  <div class="flex h-[calc(100vh_-_40px)]">
    {#each movieList as movie (movie.id)}
      <div
        class="relative min-w-0 shrink-0 basis-full bg-cover bg-center text-white"
        style:background-image="url({createBackgroundPath(movie.backdrop_path)})"
      >
        <div class="absolute inset-0 bg-[#050607b3]"></div>
        <div class="relative px-6 pt-6">
          <img
            src={createPosterPath(movie.poster_path)}
            alt={movie.title}
            class="mx-auto h-[180px] w-[120px] rounded-md"
          />

          <div class="mt-2 flex flex-col items-center">
            <h2 class="text-center text-xl font-bold">
              {movie.title}
            </h2>
            <p class="mt-2 self-start text-sm">
              {movie.vote_average} Rating
            </p>
            <p class="mt-10 line-clamp-3 max-h-36 text-ellipsis text-center text-sm/7">
              {movie.overview}
            </p>
            <Button class="mt-8">View Movie</Button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
