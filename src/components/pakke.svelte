<script lang="ts">
  import { Check } from "@steeze-ui/lucide-icons"
  import { Icon } from "@steeze-ui/svelte-icon"
  let { pack = $bindable(), name, price, startPrice, includes, calculate }: {
    pack?: string
    name: string
    price: number
    startPrice: number
    includes: string[]
    calculate: () => void
  } = $props()

  let selected = $derived(pack == name)
</script>

<div class="flex flex-col gap-4 w-80">
  <div class="flex flex-col items-center">
    <h1 class="font-bold">
      {name}pakken
    </h1>
    <p class="text-accent text-xl font-semibold">
      {price} kr. pr. kvadratmeter
    </p>
    <small class="text-xs text-white/50 mt-2 text-center">
      Startpris {startPrice} kr. Inkl. 35 kvadratmeter, derefter {price} kr. pr. kvadratmeter. Bemærk at vi benytter os af dit vand.
    </small>
  </div>
  <button
    onclick={() => {
      pack = name
      calculate()
    }}
    class="border border-accent w-full py-2 rounded {selected && "bg-accent"}"
  >
    {selected ? "Valgt" : "Vælg"}
  </button>
  <ul class="flex flex-col divide-y-[1px] divide-white/10">
    {#each includes as include}
      <li class="flex items-center gap-4 p-2">
        <Icon src={Check} class="min-w-5 w-5" />
        <p class="text-sm">
          {include}
        </p>
      </li>
    {/each}
  </ul>
</div>