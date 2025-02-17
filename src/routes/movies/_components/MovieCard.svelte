<script lang="ts">
  import { HeartIcon, StarIcon } from 'lucide-svelte';
  import type { Movie } from '$lib/types';
  import { createPosterPath } from '$lib/utils';
  import { favoriteFilms } from '../_store/favorite.svelte';

  interface MovieCardProps {
    movie: Movie;
  }

  let { movie }: MovieCardProps = $props();
  let isFavorite = $derived(favoriteFilms.isFavorite(movie.id));

  function formatReleaseDate(date?: string) {
    return date?.split('-')[0] ?? 'No date';
  }

  function handleToggleFavorites() {
    isFavorite ? favoriteFilms.remove(movie.id) : favoriteFilms.add(movie.id);
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
  <button aria-label="Add to favorites" onclick={handleToggleFavorites}>
    <HeartIcon class={isFavorite ? 'fill-red-500 text-red-500' : ''} />
  </button>
</div>
