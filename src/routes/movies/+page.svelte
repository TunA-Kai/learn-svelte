<script lang="ts">
  import { Menu, Search, X } from 'lucide-svelte';
  import NavPopup from './components/navigation/NavPopup.svelte';
</script>

<nav class="flex items-center justify-between h-10 px-2">
  <NavPopup />
  <a href="/">
    <!-- NOTE: The filter properties in CSS are applied in order, and by default, Tailwind applies brightness before invert. Because of this, you need to write the custom style as a single combined filter rule instead of applying each property separately. -->
    <img
      src="/movx-logo.png"
      alt="Movx logo"
      class="w-24 dark:[filter:invert(1)_brightness(3)]"
    />
  </a>
  <Search />
</nav>
