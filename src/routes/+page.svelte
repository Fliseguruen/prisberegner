<script lang='ts'>
  import Input from "$lib/components/input.svelte"
  import { Check } from "@steeze-ui/lucide-icons"
  import { Icon } from "@steeze-ui/svelte-icon"
  import { fly } from "svelte/transition"

  let fliser = $state<number>()
  let phone = $state<number>()
  let pack = $state<string>()

  let calculated = $state<number>()

  async function onsubmit() {
    await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: "service_mhhltql",
        user_id: "myQNiBZmk-FiNll9u",
        template_id: "template_qfczsul",
        template_params: {
          fliser,
          phone,
          pack,
          calculated
        }
      })
    })
  }

  const packs = {
    Bronze: {
      name: "Bronze",
      startPrice: 2000,
      price: 24,
      includes: [
        "Klargøring af areal til grundig rensning",
        "Rensning af fliser med højtryksrensning",
        "Fjerner ukrudt og mos mellem fliser",
        "Kvalitetstjek med billededokumentation"
      ]
    },
    Sølv: {
      name: "Sølv",
      startPrice: 2300,
      price: 37,
      includes: [
        "Alt fra bronzepakken inkluderet",
        "Miljøgodkendt skumbehandling af fliserne",
        "Påførelse af imprægnering som beskytter fliserne mod alger, flisepest og frostskader"
      ]
    },
    Guld: {
      name: "Guld",
      startPrice: 2400,
      price: 42,
      includes: [
        "Alt fra bronzepakken og sølvpakken inkluderet",
        "Grov fejlning af fugesand. Holder fliserne på plads, så de ikke bliver skæve"
      ]
    }
  }

  function calculate() {
    const picked = packs[pack as keyof typeof packs]
    if (fliser && phone  && /^\d{8}$/.test(String(phone))) {
      if (!picked || !fliser) return
      calculated = fliser > 35
        ? (fliser - 35) * picked.price + picked.startPrice
        : picked.startPrice
    } else {
      console.log("Der er ikke indtastet i begge inputfelte")
      window.alert("Indtast korrekte værdier")
    }
  }
</script>

{#snippet Pakke({ name, price, startPrice, includes }: {
  name: string
  price: number
  startPrice: number,
  includes: string[]
})}
  {@const selected = pack == name}
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
{/snippet}

<div class="flex flex-col items-center">
  <form
    {onsubmit}
    class="w-full flex flex-col"
  >
    <div class="flex flex-col items-center w-full gap-4 pt-12 pb-24">
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-semibold text-left mb-2">
          Beregn din pris
        </h1>
        <Input
          bind:value={fliser}
          name="fliser /m²"
          type="number"
          min="1"
          placeholder="Indtast antal m²..."
          required
        />
        <Input
          bind:value={phone}
          name="telefon"
          type="tel"
          placeholder="Indtast telefon nr..."
          required
          maxlength={8}
          minlength={8}
        />
        <p class="">Ved brug tillader du, at vi må ringe dig op.</p>
      </div>
    </div>

    <div class="flex min-[850px]:flex-row min-[850px]:items-start flex-col items-center justify-center gap-4 bg-main w-full text-white p-6 pt-32 relative">
      {#each Object.values(packs) as options}
        {@render Pakke(options)}
      {/each}
      <div class="flex flex-col items-center justify-center absolute bg-accent w-80 rounded h-24 top-0 -translate-y-1/2">
        <p class="text-[#BE520F] font-bold text-lg">
          Beregnet
        </p>
        {#key calculated}
          <p
            in:fly={{ y: 20 }}
            class="text-3xl font-extrabold"
          >
            {calculated ? calculated : 0} kr
          </p>
        {/key}
      </div>
    </div>
  </form>
</div>
