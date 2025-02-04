<script lang="ts">
  import { ModeWatcher } from 'mode-watcher';
  import type { LayoutProps } from './$types';
  import NavPopup from './components/navigation/NavPopup.svelte';
  import SearchPopup from './components/navigation/SearchPopup.svelte';

  let { children }: LayoutProps = $props();
</script>

<ModeWatcher defaultMode="dark" />
<nav class="flex h-10 items-center justify-between px-4">
  <NavPopup />
  <a href="/">
    <!-- NOTE: The filter properties in CSS are applied in order, and by default, Tailwind applies brightness before invert. Because of this, you need to write the custom style as a single combined filter rule instead of applying each property separately. -->
    <img
      src="/movx-logo.png"
      alt="Movx logo"
      class="w-24 dark:[filter:invert(1)_brightness(3)]"
    />
  </a>
  <SearchPopup />
</nav>
{@render children?.()}
