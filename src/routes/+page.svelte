<script lang="ts">
  import Input from "$lib/components/input.svelte";
  import { Check } from "@steeze-ui/lucide-icons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { fly } from "svelte/transition";

  // Props-interface for dine pakker
  interface PackProps {
    name: string;
    startPrice: number;
    price: number;
    includes: string[];
  }

  // Reactivt state (Svelte 5 preview feature)
  let fliser = $state<number>();
  let phone = $state<number>();
  let pack = $state<string>();
  let calculated = $state<number>();

  // Dine tre pakker
  const packs: Record<string, PackProps> = {
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
        "Levering af fugesand. Holder fliserne på plads, så de ikke bliver skæve"
      ]
    }
  };

  // Beregn pris baseret på valgte pakke og areal
  function calculate() {
    const picked = packs[pack as keyof typeof packs];
    if (fliser && phone && /^\d{8}$/.test(String(phone))) {
      if (!picked) return;
      calculated = fliser > 35
        ? (fliser - 35) * picked.price + picked.startPrice
        : picked.startPrice;
    } else {
      console.log("Der er ikke indtastet i begge inputfelte");
      window.alert("Indtast korrekte værdier");
    }
  }

  // Send data til EmailJS
  async function onSubmit() {
    // Hvis test-numre, så log og stop
    if (phone === 60735600 || phone === 60705060) {
      console.log("Test-nummer indtastet:", phone);
      return;
    }

    await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    });
  }
</script>

<div class="flex flex-col items-center">
  <form on:submit|preventDefault={onSubmit} class="w-full flex flex-col">
    <!-- Beregn-input -->
    <div class="flex flex-col items-center w-full gap-4 pt-12 pb-24">
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-semibold mb-2">Beregn din pris</h1>
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
        <p>Ved brug tillader du, at vi må ringe dig op.</p>
      </div>
    </div>

    <!-- Pakkevalg & resultat -->
    <div class="relative flex flex-col items-center justify-center bg-main w-full text-white p-6 pt-32 gap-4 min-[850px]:flex-row min-[850px]:items-start">
      <!-- Liste af pakker -->
      {#each Object.values(packs) as options (options.name)}
        {#key options.name}
          <div class="flex flex-col gap-4 w-80">
            <div class="flex flex-col items-center">
              <h1 class="font-bold">{options.name}pakken</h1>
              <p class="text-accent text-xl font-semibold">
                {options.price} kr. pr. kvadratmeter
              </p>
              <small class="text-xs text-white/50 mt-2 text-center">
                Startpris {options.startPrice} kr. inkl. 35 m², derefter {options.price} kr. pr. m².
                Bemærk at vi benytter os af dit vand.
              </small>
            </div>
            <button
              on:click={() => { pack = options.name; calculate(); }}
              class="border border-accent w-full py-2 rounded {pack === options.name ? 'bg-accent' : ''}"
            >
              {pack === options.name ? "Valgt" : "Vælg"}
            </button>
            <ul class="flex flex-col divide-y divide-white/10">
              {#each options.includes as include}
                <li class="flex items-center gap-4 p-2">
                  <Icon src={Check} class="min-w-5 w-5" />
                  <p class="text-sm">{include}</p>
                </li>
              {/each}
            </ul>
          </div>
        {/key}
      {/each}

      <!-- Beregnet pris-boks -->
      <div class="absolute top-0 -translate-y-1/2 flex flex-col items-center justify-center bg-accent w-80 rounded h-24">
        <p class="text-[#BE520F] font-bold text-lg">Beregnet</p>
        {#key calculated}
          <p in:fly={{ y: 20 }} class="text-3xl font-extrabold">
            {calculated ?? 0} kr
          </p>
        {/key}
      </div>
    </div>
  </form>
</div>
