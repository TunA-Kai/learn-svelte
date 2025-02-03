<script lang="ts">
  import * as Popover from '$lib/components/ui/popover';
  import { Menu, X } from 'lucide-svelte';
  import SwitchThemeButton from '../SwitchThemeButton.svelte';

  let open = $state(true);
  let Icon = $derived(open ? X : Menu);
</script>

<Popover.Root {open} onOpenChange={(o) => (open = o)}>
  <Popover.Trigger class="h-10">
    <Icon />
  </Popover.Trigger>
  <Popover.Content
    class="h-[calc(100vh_-_40px)] md:h-auto w-screen rounded-none"
    sideOffset={0}
  >
    <div class="flex items-center justify-between">
      Switch to Light Theme
      <SwitchThemeButton />
    </div>
  </Popover.Content>
</Popover.Root>
