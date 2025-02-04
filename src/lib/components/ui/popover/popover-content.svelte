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
    'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
    className
  )}
  bind:ref
>
  {@render children?.()}
</PopoverPrimitive.Content>
