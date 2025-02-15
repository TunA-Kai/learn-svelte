<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import PokedexLogo from './icons/PokedexLogo.svelte';
  import SearchIcon from './icons/SearchIcon.svelte';
  import * as Select from '$lib/components/ui/select';
  import PokeCard from './PokeCard.svelte';
  import type { PageProps } from './$types';

  let sort = $state('lowest');
  let filter = $state('all');
  let search = $state('');
  let searchInput: HTMLInputElement;

  let { data }: PageProps = $props();

  let pokemonList = $derived.by(() => {
    let filtered = data.data.filter(({ pokemon }) => {
      if (filter === 'all') return true;
      return pokemon.types.some(({ type }) => type.name === filter);
    });

    let sorted = filtered.sort((a, b) => {
      if (sort === 'lowest') return a.pokemon.id - b.pokemon.id;
      return b.pokemon.id - a.pokemon.id;
    });

    return sorted.filter(({ pokemon }) => {
      if (!search) return true;
      return pokemon.name.includes(search) || pokemon.id === Number(search);
    });
  });

  function searchPokemon() {
    search = searchInput.value.trim();
  }
</script>

<main class="min-h-screen bg-slate-200 p-8">
  <div class="mx-auto max-w-5xl">
    <PokedexLogo />

    <div
      class="mt-8 flex items-center gap-4 rounded-lg bg-white px-4 py-2 shadow-md"
    >
      <SearchIcon />
      <input
        type="text"
        placeholder="Pokemon name, number or type"
        class="w-full bg-transparent focus:outline-none"
        bind:this={searchInput}
        onkeydown={({ key }) => key === 'Enter' && searchPokemon()}
      />
      <Button class="ml-auto" onclick={searchPokemon}>Search</Button>
    </div>

    <div class="flex justify-between">
      <Select.Root type="single" bind:value={sort}>
        <Select.Trigger class="mt-4 w-[200px]">
          {sort === 'lowest' ? 'Lowest Number First' : 'Highest Number First'}
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="lowest">Lowest Number First</Select.Item>
          <Select.Item value="highest">Highest Number First</Select.Item>
        </Select.Content>
      </Select.Root>

      <Select.Root type="single" bind:value={filter}>
        <Select.Trigger class="mt-4 w-[200px]">
          {filter}
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="all">All</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>

    <ul class="mt-24 grid grid-cols-4 gap-x-4 gap-y-24">
      {#each pokemonList as { pokemon: { sprites, name, id, types }, color } (id)}
        <PokeCard
          imgSrc={sprites.other['official-artwork'].front_default || ''}
          {name}
          number={String(id)}
          types={types.map(({ type }) => type.name)}
          {color}
        />
      {/each}
    </ul>
  </div>
</main>
