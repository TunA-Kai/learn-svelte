<script lang="ts">
  import { MoonIcon, SunIcon } from 'lucide-svelte';
  import { toggleMode, mode } from 'mode-watcher';
</script>

<div class="relative flex scale-[0.75] items-center justify-center">
  <input
    type="checkbox"
    class="absolute opacity-0"
    id="theme-switch"
    onclick={toggleMode}
  />

  <label
    class={[
      'relative flex h-10 w-20 cursor-pointer items-center justify-between rounded-full bg-[#1792c7] p-2',
      $mode
    ]}
    for="theme-switch"
  >
    <MoonIcon />
    <SunIcon />
    <div
      class={[
        'absolute left-[5px] top-[5px] h-[30px] w-[30px] rounded-full bg-white transition-all',
        $mode === 'dark' ? 'translate-x-10' : 'translate-x-0'
      ]}
    ></div>
  </label>
</div>

<!-- NOTE: transition doesn't work with tailwind dark mode "translate-x-0 dark:translate-x-10" -->
