<script lang="ts">
  import { getTextColor } from './utils';

  interface Props {
    imgSrc: string;
    name: string;
    number: string;
    types: string[];
    color: string;
  }

  let { imgSrc, name, number, types, color }: Props = $props();

  let textColor = getTextColor(color);
</script>

<li
  class="rounded-2xl p-4"
  style:background-color={color}
  style:color={textColor}
>
  <!-- Poke image -->
  <img src={imgSrc} alt={name} class="mx-auto h-36 w-36 -translate-y-20" />

  <!-- Poke name -->
  <h2 class="-translate-y-5 text-xl">{name}</h2>

  <!-- Poke number -->
  <p class="-translate-y-3">#{number.padStart(3, '0')}</p>

  <!-- Poke types -->
  <div class="space-x-2">
    {#each types as type}
      {@render typeChip(type)}
    {/each}
  </div>
</li>

{#snippet typeChip(title: string)}
  <span
    class="rounded-full bg-white px-2 py-1 text-xs font-semibold text-black"
  >
    {title}
  </span>
{/snippet}
