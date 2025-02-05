<script lang="ts">
  import * as Popover from '$lib/components/ui/popover';
  import { Menu, X } from 'lucide-svelte';
  import { page } from '$app/state';
  import SwitchThemeButton from '../SwitchThemeButton.svelte';
  import { mode } from 'mode-watcher';

  let open = $state(false);
  let Icon = $derived(open ? X : Menu);

  const pathname = $derived(page.url.pathname.split('/')[2] || '');

  const ROUTES = [
    { name: 'Home', href: '' },
    { name: 'Trending', href: 'trending' },
    { name: 'Discover', href: 'discover' },
    { name: 'Popular', href: 'popular' },
    { name: 'Top Rated', href: 'top-rated' },
    { name: 'Upcoming', href: 'upcoming' },
    { name: 'TV Shows', href: 'tv-shows' },
    { name: 'People', href: 'people' },
    { name: 'Genres', href: 'genres' },
    { name: 'Favorites', href: 'favorites' }
  ];
</script>

<Popover.Root {open} onOpenChange={(o) => (open = o)}>
  <Popover.Trigger class="h-full md:hidden">
    <Icon />
  </Popover.Trigger>

  <Popover.Content
    class={[
      'w-screen overflow-hidden rounded-none border-none p-0 transition-all duration-500 md:hidden',
      open ? 'h-[calc(100vh_-_40px)] opacity-100' : 'h-0 opacity-0'
    ]}
    sideOffset={0}
    forceMount
  >
    <div
      class="flex items-center justify-between bg-input py-1 pl-6 pr-4 text-sm"
    >
      Switch to {$mode === 'dark' ? 'Light' : 'Dark'} Theme
      <SwitchThemeButton />
    </div>
    <div class="flex flex-col">
      {#each ROUTES as { name, href }, i}
        <a
          href={'/movies/' + href}
          class={[
            'hover:text-primary-500 border-b border-border py-3 pl-6 md:font-bold',
            pathname === href && 'bg-secondary'
          ]}
          onclick={() => (open = false)}
        >
          {name}
        </a>
      {/each}
    </div>
  </Popover.Content>
</Popover.Root>
