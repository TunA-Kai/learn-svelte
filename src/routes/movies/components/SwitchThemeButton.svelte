<script lang="ts">
  import { MoonIcon, SunIcon } from 'lucide-svelte';
  import { toggleMode, mode } from 'mode-watcher';
</script>

<div class="flex items-center justify-center relative">
  <input
    type="checkbox"
    class="opacity-0 absolute"
    id="theme-switch"
    onclick={toggleMode}
  />

  <label
    class={[
      'flex items-center justify-between p-2 rounded-full relative h-10 w-20 cursor-pointer bg-[#1792c7]',
      $mode
    ]}
    for="theme-switch"
  >
    <MoonIcon />
    <SunIcon />
    <div
      class={[
        'bg-white absolute rounded-full top-[5px] left-[5px] h-[30px] w-[30px] transition-all',
        $mode === 'dark' ? 'translate-x-10' : 'translate-x-0'
      ]}
    ></div>
  </label>
</div>

<!-- NOTE: transition doesn't work with tailwind dark mode "translate-x-0 dark:translate-x-10" -->
