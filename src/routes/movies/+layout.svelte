<script lang="ts">
  import { ModeWatcher } from 'mode-watcher';
  import { onMount } from 'svelte';
  import type { LayoutProps } from './$types';
  import NavPopup from './_components/navigation/NavPopup.svelte';
  import SearchPopup from './_components/navigation/SearchPopup.svelte';

  let { children }: LayoutProps = $props();

  let isScrolled = $state(false);

  function handleWindowScroll() {
    isScrolled = window.scrollY > 0;
  }

  onMount(() => {
    window.addEventListener('scroll', handleWindowScroll);

    // Cleanup the event listener when the component is destroyed
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  });
</script>

<ModeWatcher defaultMode="dark" />
<nav
  class={[
    'fixed top-0 z-50 flex h-10 w-full items-center justify-between bg-background px-4',
    !isScrolled && 'md:bg-transparent'
  ]}
>
  <NavPopup />
  <a href="/">
    <!-- NOTE: The filter properties in CSS are applied in order, and by default, Tailwind applies brightness before invert. Because of this, you need to write the custom style as a single combined filter rule instead of applying each property separately. -->
    <img src="/movx-logo.png" alt="Movx logo" class="w-24 dark:[filter:invert(1)_brightness(3)]" />
  </a>
  <SearchPopup />
</nav>

{@render children?.()}
