<script lang="ts">
  import { SearchIcon, XIcon } from 'lucide-svelte';
  import * as Popover from '$lib/components/ui/popover';

  let open = $state(false);
  let Icon = $derived(open ? XIcon : SearchIcon);
</script>

<Popover.Root {open} onOpenChange={(o) => (open = o)}>
  <Popover.Trigger class="h-full md:hidden">
    <Icon />
  </Popover.Trigger>

  <Popover.Content
    class={[
      'w-screen overflow-hidden rounded-none border-none transition-all duration-500 md:hidden',
      open ? 'opacity-100' : 'opacity-0'
    ]}
    sideOffset={0}
    forceMount
  >
    <div class="flex overflow-hidden rounded-lg">
      <input
        type="text"
        class="flex-grow bg-input px-4 focus:outline-none"
        placeholder="Search"
      />
      <div class="grid h-10 w-10 place-items-center bg-[#f7ef47]">
        <SearchIcon color="#000" size={20} />
      </div>
    </div>
  </Popover.Content>
</Popover.Root>
