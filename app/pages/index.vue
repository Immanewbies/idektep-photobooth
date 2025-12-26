<script setup lang="ts">
import { ref } from "vue";

const isFestive = ref(false);
const toggleEasterEgg = () => {
  isFestive.value = !isFestive.value;
};
</script>

<template>
  <div
    class="relative overflow-hidden p-4 min-h-screen font-archivo flex flex-col justify-center items-center gap-8 sm:gap-8 md:gap-8 lg:gap-10 xl:gap-12 bg-[#00353A] selection:bg-[#C80931]/30"
  >
    <div class="pointer-events-none absolute inset-0 z-0 opacity-30">
      <div class="snow" />
    </div>

    <header
      class="relative z-10 flex flex-col justify-center items-center select-none"
    >
      <div class="relative">
        <span
          class="absolute left-0 top-0 w-10 h-16 cursor-pointer z-20"
          @click="toggleEasterEgg"
        />

        <span
          v-if="isFestive"
          class="absolute -top-7 -left-4 text-4xl -rotate-12 animate-bounce-short z-10"
        >
          🎅
        </span>

        <p class="font-archivo text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white relative">iDEKTEP</p>
      </div>

      <div class="relative">
        <p
          class="font-damion text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#C80931] relative -mt-7 sm:-mt-7 md:-mt-7.5 lg:-mt-9.5 xl:-mt-11.5 drop-shadow-md"
        >
          photo booth
        </p>

        <div
          class="absolute -bottom-4 sm:-bottom-4 md:-bottom-6 lg:-bottom-6 xl:-bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 px-2 py-0.5 rounded shadow-sm"
        >
          <p
            class="text-[7px] xs:text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm uppercase text-white/90 font-medium whitespace-nowrap"
          >
            Christmas Edition
          </p>
        </div>
      </div>
    </header>

    <a
      href="/camera"
      class="group relative z-10 rounded-full bg-[#C80931] px-8 py-3 sm:px-10 sm:py-3 md:px-12 md:py-4 lg:px-16 lg:py-5 text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(200,9,49,0.5)] active:scale-95"
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

<style scoped>
/* Minimalist Snowfall Effect */
.snow {
  background: radial-gradient(circle at center, #fff 1px, transparent 1px);
  background-size: 50px 50px;
  width: 100%;
  height: 200%;
  position: absolute;
  top: -100%;
  animation: snowfall 20s linear infinite;
}

@keyframes snowfall {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(50%);
  }
}

@keyframes bounce-short {
  0%,
  100% {
    transform: translateY(0) rotate(-12deg);
  }
  50% {
    transform: translateY(-5px) rotate(-15deg);
  }
}

.animate-bounce-short {
  animation: bounce-short 2s ease-in-out infinite;
}
</style>

<style>
html,
body {
  background-color: #00353a;
}
body::before {
  background-color: #00353a;
}
</style>
