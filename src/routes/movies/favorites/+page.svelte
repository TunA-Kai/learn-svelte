<script lang="ts">
  import { PUBLIC_API_KEY } from '$env/static/public';
  import { Loader } from 'lucide-svelte';
  import MovieCard from '../_components/MovieCard.svelte';
  import { favoriteFilms } from '../_store/favorite.svelte';

  const data = $derived(favoriteFilms.data);

  const promise = $derived(
    Promise.all(
      favoriteFilms.data.map((id) =>
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${PUBLIC_API_KEY}`).then((res) =>
          res.json()
        )
      )
    )
  );
</script>

<h1 class="mt-20">Favorite Movies</h1>
{#if data.length}
  {#await promise}
    <Loader class="mx-auto animate-spin" />
  {:then movies}
    {#if movies.length}
      <div class="mt-4 grid grid-cols-2 gap-4">
        {#each movies as movie (movie.id)}
          <MovieCard {movie} />
        {/each}
      </div>
    {:else}
      <p>No favorite movies found</p>
    {/if}
  {/await}
{/if}
