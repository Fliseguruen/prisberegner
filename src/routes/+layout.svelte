<script lang="ts">
  import { items, sidebar } from "$lib/sidebar.svelte"
  import { tapOutside } from 'svelte-outside'
  import "../app.css"
  import { fade, fly } from "svelte/transition"
  import Navbar from "$lib/components/navbar.svelte"
  import Footer from "$lib/components/footer.svelte"
</script>

{#if sidebar.show}
  <div
    in:fade={{ duration: 100 }}
    out:fade={{ duration: 100 }}
    class="lg:hidden block fixed w-full h-full bg-black/20 backdrop-blur-[2px] z-50"
  ></div>
  <nav
    use:tapOutside={() => sidebar.show = false}
    in:fly={{ x: -150, duration: 100, opacity: 1 }}
    out:fly={{ x: -300, duration: 100, opacity: 1 }}
    class="lg:hidden flex flex-col w-fit text-white fixed inset-0 bg-main overflow-y-auto divide-y-[1px] divide-white/10 z-50"
  >
    {#each items as [item, src]}
      <a
        href="https://fliseguruen.dk/{ src
          ? src
          : `${item.toLocaleLowerCase()}.aspx`
        }"
        class="whitespace-nowrap hover:opacity-50 transition-all duration-100 p-6 text-xl font-semibold"
      >
        {item}
      </a>
    {/each}
  </nav>
{/if}

<div class="">
  <Navbar />
  <slot />
  <Footer />
</div>