<script setup lang="ts">
import { ref } from "vue";

const isFestive = ref(false);
const toggleEasterEgg = () => {
  isFestive.value = !isFestive.value;
};
</script>

<template>
  <div
    class="relative p-4 min-h-screen font-archivo overflow-hidden flex flex-col justify-center items-center gap-12 bg-[#00353A] selection:bg-[#C80931]/30"
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

        <p class="font-archivo text-7xl text-white tracking-wider relative">
          iDEKTEP
        </p>
      </div>

      <div class="relative">
        <p
          class="font-damion text-7xl text-[#C80931] relative tracking-wider -mt-11.5 drop-shadow-md"
        >
          photo booth
        </p>

        <div
          class="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 px-2 py-0.5 rounded shadow-sm"
        >
          <p
            class="text-[10px] uppercase tracking-[0.2em] text-white/90 font-medium"
          >
            Christmas Edition
          </p>
        </div>
      </div>
    </header>

    <a
      href="/camera"
      class="group relative z-10 overflow-hidden rounded-full bg-[#C80931] px-12 py-4 text-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(200,9,49,0.5)] active:scale-95"
    >
      <span class="relative z-10 tracking-[0.1em]">START</span>
      <div
        class="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0"
      />
    </a>

    <footer class="absolute bottom-6 text-[10px] text-white/20 tracking-[0.4em] uppercase">
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
    html,body {
    background-color: #00353A;
  }
  body::before {
    background-color: #00353A;
  }
</style>