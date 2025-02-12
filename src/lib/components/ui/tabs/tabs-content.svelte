<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui';

  const { class: className, children, ...restProps }: TabsPrimitive.ContentProps = $props();
</script>

<TabsPrimitive.Content
  class={[
    'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    className
  ]}
  {...restProps}
>
  {@render children?.()}
</TabsPrimitive.Content>
