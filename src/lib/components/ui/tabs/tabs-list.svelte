<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui';

  const { class: className, children, ...restProps }: TabsPrimitive.ListProps = $props();
</script>

<TabsPrimitive.List
  class={[
    'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
    className
  ]}
  {...restProps}
>
  {@render children?.()}
</TabsPrimitive.List>
