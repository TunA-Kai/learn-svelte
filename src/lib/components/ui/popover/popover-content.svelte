<script lang="ts">
  import { Popover as PopoverPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    align = 'center',
    sideOffset = 4,
    children,
    ...rest
  }: PopoverPrimitive.ContentProps = $props();
</script>

<PopoverPrimitive.Content
  {align}
  {sideOffset}
  {...rest}
  class={cn(
    'bg-popover text-popover-foreground z-50 w-72 rounded-md border p-4 shadow-md outline-none',
    className
  )}
  bind:ref
>
  {@render children?.()}
</PopoverPrimitive.Content>
