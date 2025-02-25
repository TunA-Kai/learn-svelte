<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import type { Movie } from '$lib/types';
  import { createBackgroundPath, createPosterPath } from '$lib/utils';
  import Autoplay from 'embla-carousel-autoplay';
  import EmblaFade from 'embla-carousel-fade';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import type { PageProps } from './$types';
  import MovieCard from './_components/MovieCard.svelte';

  const plugins = [EmblaFade(), Autoplay()];

  let { data }: PageProps = $props();
  const { popularList, upcomingList, topRatedList } = data;
</script>

<section class="-mx-6 overflow-hidden" use:emblaCarouselSvelte={{ plugins, options: {} }}>
  <div class="flex h-screen">
    {#each popularList as movie (movie.id)}
      <div
        class="relative min-w-0 shrink-0 basis-full bg-cover bg-center text-white"
        style:background-image="url({createBackgroundPath(movie.backdrop_path)})"
      >
        <div class="absolute inset-0 bg-[#050607b3]"></div>
        <div class="relative px-6 pt-16">
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
</section>

{@render movieSection(upcomingList, 'Upcoming Movies', '/upcoming')}

{@render movieSection(topRatedList, 'Top Rated Movies', '/top-rated')}

{#snippet movieSection(list: Movie[], title: string, href: string)}
  <section class="mt-12">
    <h2 class="text-center text-xl font-bold">{title}</h2>
    <div class="mt-8 grid grid-cols-2 gap-4">
      {#each list.slice(0, 10) as movie (movie.id)}
        <MovieCard {movie} />
      {/each}
    </div>

    <Button href={`/movies/${href}`} class="mx-auto mt-8 block w-fit">View All {title}</Button>
  </section>
{/snippet}
