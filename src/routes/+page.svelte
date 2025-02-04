<script lang="ts">
  import { buttonVariants } from '$lib/components/ui/button';

  const routes = ['/pokedex', '/movies'];
</script>

<div class="m-8 flex w-fit flex-col gap-4">
  {#each routes as route}
    <a href={route} class={buttonVariants()}>Go to {route}</a>
  {/each}
</div>
