<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import PokedexLogo from './icons/PokedexLogo.svelte';
  import SearchIcon from './icons/SearchIcon.svelte';
  import * as Select from '$lib/components/ui/select';

  let sort = $state('lowest');
</script>

<main class="bg-slate-200 min-h-screen p-8">
  <PokedexLogo />

  <div
    class="flex gap-4 items-center mt-8 bg-white py-2 px-4 rounded-lg shadow-md"
  >
    <SearchIcon />
    <input type="text" placeholder="Pokemon name, number or type" />
    <Button class="ml-auto">Search</Button>
  </div>

  <Select.Root type="single" bind:value={sort}>
    <Select.Trigger class="w-[200px] mt-4">
      {sort === 'lowest' ? 'Lowest Number First' : 'Highest Number First'}
    </Select.Trigger>
    <Select.Content>
      <Select.Item value="lowest">Lowest Number First</Select.Item>
      <Select.Item value="highest">Highest Number First</Select.Item>
    </Select.Content>
  </Select.Root>
</main>
