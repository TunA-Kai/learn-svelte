<script lang="ts">
  import { StarIcon } from 'lucide-svelte';
  import type { Movie } from '$lib/types';
  import { createPosterPath } from '$lib/utils';

  interface MovieCardProps {
    movie: Movie;
  }

  let { movie }: MovieCardProps = $props();

  function formatReleaseDate(date?: string) {
    return date?.split('-')[0] ?? 'No date';
  }
</script>

<div class="relative">
  <div class="absolute left-0 top-0 flex items-center gap-2 bg-destructive px-2 py-1">
    <StarIcon size={16} />
    {movie.vote_average.toFixed(1)}
  </div>
  <img src={createPosterPath(movie.poster_path)} alt={movie.title} class="w-full rounded-md" />
  <h3 class="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
    {movie.title || movie.name}
  </h3>
  <p class="text-sm">{formatReleaseDate(movie.release_date || movie.first_air_date)}</p>
</div>
