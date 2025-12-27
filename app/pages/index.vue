<template>
  <div
    class="relative overflow-hidden p-4 min-h-screen font-archivo flex flex-col justify-center items-center gap-8 sm:gap-8 md:gap-8 lg:gap-10 xl:gap-12"
  >
    <header
      class="relative z-10 flex flex-col justify-center items-center select-none"
    >
      <div class="relative">

        <p class="font-archivo text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white relative">iDEKTEP</p>
      </div>

      <div class="relative">
        <p
          class="font-damion text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-idt2 relative -mt-7 sm:-mt-7 md:-mt-7.5 lg:-mt-9.5 xl:-mt-11.5 drop-shadow-md"
        >
          photo booth
        </p>
      </div>
    </header>

    <a
      href="/camera"
      class="group relative z-10 rounded-full bg-idt3 px-8 py-3 sm:px-10 sm:py-3 md:px-12 md:py-4 lg:px-16 lg:py-5 text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(200,9,49,0.5)] active:scale-95"
    >
      <span class="relative z-10 tracking-[0.1em]">START</span>
    </a>

    <!-- Footer -->
    <footer
      class="absolute bottom-10 md:bottom-6 z-50 text-[7px] sm:text-[8px] md:text-[8px] lg:text-[10px] xl:text-[10px] text-white/20 tracking-[0.4em] uppercase"
    >
      Copyright © 2025 iDektep. All rights reserved.
    </footer>
  </div>
</template>

a