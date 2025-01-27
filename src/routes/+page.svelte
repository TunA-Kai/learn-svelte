<script lang="ts">
  import { buttonVariants } from '$lib/components/ui/button';

  const routes = ['/pokedex', '/movies'];
</script>

<div class="flex flex-col gap-4 m-8 w-fit">
  {#each routes as route}
    <a href={route} class={buttonVariants()}>Go to {route}</a>
  {/each}
</div>
