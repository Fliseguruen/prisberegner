<script lang='ts'>
  import { capitalize } from "$lib/utils"
  import type { HTMLInputAttributes } from "svelte/elements"

  let {
    name,
    value = $bindable(),
    ...props
  }: HTMLInputAttributes & {
    name: string
  } = $props()
</script>

<div class="flex flex-col gap-1">
  <label for={name}>
    {capitalize(name)}
  </label>
  <input
    {name}
    id={name}
    bind:value
    {...props}
    class="p-2 border border-main/30 focus:border-main rounded-sm"
  />
</div>