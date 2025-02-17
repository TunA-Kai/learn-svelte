<script lang="ts">
  import { SearchIcon, XIcon } from 'lucide-svelte';
  import * as Popover from '$lib/components/ui/popover';
  import { goto } from '$app/navigation';

  let open = $state(false);
  let showRecentSearches = $state(false);
  let recentSearches = $state(JSON.parse(localStorage.getItem('searchQuery') || '[]'));
  let Icon = $derived(open ? XIcon : SearchIcon);

  let query = $state('');

  let input: HTMLInputElement;

  function handleClickSearch() {
    const localSearchQuery = JSON.parse(localStorage.getItem('searchQuery') || '[]');
    const newLocalSearchQuery = Array.from(new Set([query, ...localSearchQuery])).slice(0, 3);
    localStorage.setItem('searchQuery', JSON.stringify(newLocalSearchQuery));
    goto(`/movies/search?query=${query}`);
    recentSearches = newLocalSearchQuery;
    open = false;
    showRecentSearches = false;
  }
</script>

<Popover.Root bind:open>
  <Popover.Trigger class="h-full md:hidden">
    <Icon />
  </Popover.Trigger>

  <Popover.Content
    class={[
      'w-screen rounded-none border-none transition-all duration-500 md:hidden',
      open ? 'translate-y-28 opacity-100' : 'translate-y-0 opacity-0'
    ]}
    sideOffset={-120}
    forceMount
    onOpenAutoFocus={(e) => {
      e.preventDefault();
      open && input.focus();
    }}
    onInteractOutside={() => (showRecentSearches = false)}
  >
    <div class="relative flex">
      <input
        type="text"
        class="flex-grow bg-input px-4 focus:outline-none"
        placeholder="Search"
        value={query}
        oninput={(e) => (query = e.currentTarget.value)}
        onkeydown={(e) => e.key === 'Enter' && handleClickSearch()}
        onfocus={() => (showRecentSearches = true)}
        bind:this={input}
      />
      <button
        class="grid h-10 w-10 place-items-center bg-[#f7ef47]"
        onclick={handleClickSearch}
        aria-label="Search"
      >
        <SearchIcon color="#000" size={20} />
      </button>

      {#if showRecentSearches && recentSearches.length > 0}
        <div class="absolute bottom-0 w-full translate-y-28 bg-white text-black">
          <p>Recent Searches</p>
          <ul>
            {#each recentSearches as search}
              <li>{search}</li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  </Popover.Content>
</Popover.Root>
