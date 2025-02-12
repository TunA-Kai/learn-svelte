<script lang="ts">
  import { SearchIcon, XIcon } from 'lucide-svelte';
  import * as Popover from '$lib/components/ui/popover';
  import { goto } from '$app/navigation';

  let open = $state(false);
  let Icon = $derived(open ? XIcon : SearchIcon);

  let query = $state('');

  function handleClickSearch() {
    open = false;
    goto(`/movies/search?query=${query}`);
  }
</script>

<Popover.Root {open} onOpenChange={(o: boolean) => (open = o)}>
  <Popover.Trigger class="h-full md:hidden">
    <Icon />
  </Popover.Trigger>

  <Popover.Content
    class={[
      'w-screen overflow-hidden rounded-none border-none transition-all duration-500 md:hidden',
      open ? 'translate-y-28 opacity-100' : 'translate-y-0 opacity-0'
    ]}
    sideOffset={-120}
    forceMount
  >
    <div class="flex overflow-hidden rounded-lg">
      <input
        type="text"
        class="flex-grow bg-input px-4 focus:outline-none"
        placeholder="Search"
        value={query}
        oninput={(e) => (query = e.currentTarget.value)}
        onkeydown={(e) => e.key === 'Enter' && handleClickSearch()}
      />
      <button
        class="grid h-10 w-10 place-items-center bg-[#f7ef47]"
        onclick={handleClickSearch}
        aria-label="Search"
      >
        <SearchIcon color="#000" size={20} />
      </button>
    </div>
  </Popover.Content>
</Popover.Root>
