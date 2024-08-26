<script lang='ts'>
  import Logo from '$lib/components/images/Logo.png'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Menu, Phone } from '@steeze-ui/lucide-icons'
  import { Envelope } from '@steeze-ui/heroicons'
  import { items, sidebar } from '$lib/sidebar.svelte'
</script>

<div class="flex justify-center bg-main relative">
  <!-- Desktop Nav -->
  <nav class="lg:flex hidden items-center max-w-[92rem] w-full h-28 px-4 relative">
    <img src={Logo} alt="fliseguruen logo" class="h-14 absolute left-0 top-1/2 transform -translate-y-1/2" />

    <!-- Dette er den del, hvor elementerne justeres -->
    <div class="text-white flex gap-6 justify-center mx-auto">
      {#each items as [item, src]}
        <a
          href="https://fliseguruen.dk/{ src ? src : `${item.toLocaleLowerCase()}.aspx` }"
          class="whitespace-nowrap hover:opacity-50 transition-all duration-100"
        >
          {item}
        </a>
      {/each}
    </div>

    <div class="flex items-center gap-4 absolute right-0 top-1/2 transform -translate-y-1/2">
      <a class= "flex gap-2 text-accent font-bold whitespace-nowrap items-center" href="tel:+45 60 73 56 00">
        <Icon src={Phone} class="size-5 text-main fill-accent mt-1" />
        <p>+45 60 73 56 00</p>
      </a>
      <a
        href="https://fliseguruen.dk/kontakt.aspx"
        class="bg-accent text-white px-9 py-3 rounded-sm"
      >
        Kontakt os
      </a>
    </div>
  </nav>

  <!-- Mobile Nav -->
  <nav class="lg:hidden flex w-full bg-main h-16">
    <button onclick={() => sidebar.show = true} class="px-8">
      <Icon src={Menu} class="text-white size-5" />
    </button>
    <a
      href="tel:+45 60 73 56 00"
      class="flex flex-col items-center text-white font-bold whitespace-nowrap w-full bg-accent justify-center"
    >
      <Icon src={Phone} class="size-6 text-accent fill-white" />
      <p>+45 60 73 56 00</p>
    </a>
    <a
      href="mailto:kontakt@fliseguruen.dk"
      class="flex flex-col items-center text-white font-bold whitespace-nowrap w-full bg-accent justify-center"
    >
      <Icon src={Envelope} class="size-6 fill-white text-accent" />
      <p>Send Mail</p>
    </a>
  </nav>
</div>