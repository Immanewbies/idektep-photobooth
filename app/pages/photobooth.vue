<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center gap-8 font-archivo bg-[#00353A] relative overflow-hidden p-4"
  >
    <div class="pointer-events-none absolute inset-0 z-0 opacity-20">
      <div class="snow" />
    </div>

    <header
      class="relative z-10 flex flex-col justify-center items-center select-none scale-100 md:scale-100"
    >
      <div class="relative">
        <p class="font-archivo md:text-4xl lg:text-4xl xl:text-5xl text-white relative">
          iDEKTEP
        </p>
      </div>

      <div class="relative">
        <p
          class="font-damion md:text-4xl lg:text-4xl xl:text-5xl text-[#C80931] relative md:-mt-6.5 lg:-mt-6.5 xl:-mt-7.5 drop-shadow-md"
        >
          photo booth
        </p>

        <div
          class="absolute -right-4 -bottom-3 bg-white/10 backdrop-blur-md border border-white/20 px-2 py-0.5 rounded shadow-sm"
        >
          <p
            class="md:text-[6px] lg:text-[6px] xl:text-[7px] uppercase text-white/90 font-medium whitespace-nowrap"
          >
            Christmas Edition
          </p>
        </div>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-[120px_auto_120px] items-center gap-8 relative z-10">
      
      <div class="hidden lg:block" />

      <div
        ref="photoboothRef"
        class="relative flex flex-col items-center gap-5 p-6 transition shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-white/5 backdrop-blur-sm rounded-lg"
        :style="{
          backgroundImage: `url(${currentPreset?.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '340px',
          height: '480px'
        }"
      >
        <div class="grid grid-cols-2 gap-4 w-full z-10 -mt-2">
          <div
            v-for="(img, index) in images"
            :key="index"
            class="w-full aspect-1 overflow-hidden bg-black shadow-inner"
          >
            <img :src="img" class="w-full h-full object-cover" alt="">
          </div>
        </div>

        <img
          :src="currentPreset?.frame"
          class="absolute inset-0 w-full h-full object-cover pointer-events-none z-20"
        >
      </div>

      <div class="flex flex-row lg:flex-col gap-4 overflow-x-auto py-2">
        <div
          v-for="(preset, index) in presets"
          :key="index"
          class="w-14 h-14 rounded-full border-2 cursor-pointer transition-all duration-300 hover:scale-110 flex-shrink-0 p-0.5"
          :class="selectedPreset === index ? 'border-[#C80931] bg-[#C80931]' : 'border-white/20 bg-white/5'"
          @click="selectPreset(index)"
        >
          <div 
            class="w-full h-full rounded-full bg-cover bg-center"
            :style="{ backgroundImage: `url(${preset.thumbnail})` }"
          />
        </div>
      </div>
    </div>

    <div class="flex gap-6 relative z-10">
      <button
        class="group w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-all hover:bg-[#C80931] hover:border-[#C80931]"
        title="Share"
        :disabled="isProcessing"
        @click="handleShare"
      >
        <i class="fi-rr-share text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        class="w-14 h-14 bg-[#C80931] text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg"
        @click="handleFinish"
      >
        <i class="fi-rr-check text-xl" />
      </button>

      <button
        class="group w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-all hover:bg-[#C80931] hover:border-[#C80931]"
        title="Download"
        :disabled="isProcessing"
        @click="handleDownload"
      >
        <i class="fi-rr-download text-white group-hover:scale-110 transition-transform" />
      </button>
    </div>

    <footer class="absolute bottom-6 text-[10px] text-white/20 tracking-[0.4em] uppercase">
      Copyright © 2025 iDektep. All rights reserved.
    </footer>

    <div ref="exportRef" class="export-root" :style="{ backgroundImage: `url(${currentPreset?.background})` }">
      <div class="photo-grid">
        <div v-for="(img, index) in images" :key="index" class="photo-item">
          <img :src="img" class="w-full h-full object-cover">
        </div>
      </div>
      <img :src="currentPreset?.frame" class="absolute inset-0 w-full h-full object-cover z-[100]">
    </div>
  </div>
</template>

<script setup lang="ts">
/* ... Logic remains exactly as your provided code ... */
/* Ensure you keep the handleShare, handleDownload, and handleFinish logic */
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const images = ref<string[]>([]);
const exportRef = ref<HTMLElement | null>(null);
const isProcessing = ref(false);
const selectedPreset = ref(0);

const presets = ref([
  { id: 1, name: "Default", background: "/img/xmas/bg1.png", frame: "/img/xmas/frame1.png", thumbnail: "/img/xmas/bg1.png" },
  { id: 2, name: "Preset 2", background: "/img/xmas/bg2.png", frame: "/img/xmas/frame2.png", thumbnail: "/img/xmas/bg2.png" },
  { id: 3, name: "Preset 3", background: "/img/xmas/bg3.png", frame: "/img/xmas/frame3.png", thumbnail: "/img/xmas/bg3.png" },
  { id: 4, name: "Preset 4", background: "/img/xmas/bg4.png", frame: "/img/xmas/frame4.png", thumbnail: "/img/xmas/bg4.png" },
  { id: 5, name: "Preset 5", background: "/img/xmas/bg5.png", frame: "/img/xmas/frame5.png", thumbnail: "/img/xmas/bg5.png" },
]);

const currentPreset = computed(() => presets.value[selectedPreset.value] || presets.value[0]);
const selectPreset = (index: number) => { selectedPreset.value = index; };

const handleFinish = () => {
  sessionStorage.removeItem("photoboothImages");
  router.push("/");
};

const capturePhotobooth = async (): Promise<Blob | null> => {
  if (!exportRef.value) return null;
  const width = 1240;
  const height = 1748;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const loadImage = (src: string): Promise<HTMLImageElement> => new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });

  if (currentPreset.value?.background) {
    const bg = await loadImage(currentPreset.value.background);
    ctx.drawImage(bg, 0, 0, width, height);
  }

  const cfg = { top: 72, left: 72, w: 528, h: 706, gap: 40 };
  for (let i = 0; i < images.value.length; i++) {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const imgSrc = images.value[i];
    if (imgSrc) {
      const img = await loadImage(imgSrc);
      ctx.drawImage(img, cfg.left + col*(cfg.w+cfg.gap), cfg.top + row*(cfg.h+cfg.gap), cfg.w, cfg.h);
    }
  }

  if (currentPreset.value?.frame) {
    const fr = await loadImage(currentPreset.value.frame);
    ctx.drawImage(fr, 0, 0, width, height);
  }

  return new Promise(res => canvas.toBlob(b => res(b), "image/png", 1.0));
};

const handleDownload = async () => {
  isProcessing.value = true;
  const blob = await capturePhotobooth();
  if (blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `christmas-booth-${Date.now()}.png`;
    a.click();
  }
  isProcessing.value = false;
};

const handleShare = async () => {
  isProcessing.value = true;
  const blob = await capturePhotobooth();
  if (blob && navigator.share) {
    const file = new File([blob], "booth.png", { type: "image/png" });
    await navigator.share({ files: [file], title: 'iDEKTEP' }).catch(() => {});
  }
  isProcessing.value = false;
};

onMounted(() => {
  const data = sessionStorage.getItem("photoboothImages");
  if (data) images.value = JSON.parse(data);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Damion&display=swap');

.snow {
  background: radial-gradient(circle at center, #fff 1px, transparent 1px);
  background-size: 80px 80px;
  width: 100%;
  height: 200%;
  position: absolute;
  top: -100%;
  animation: snowfall 30s linear infinite;
}

@keyframes snowfall {
  from { transform: translateY(0); }
  to { transform: translateY(50%); }
}

.export-root {
  width: 1240px; height: 1748px;
  position: fixed; left: -9999px;
  background-size: cover;
}

.photo-grid {
  position: absolute; top: 72px; left: 72px;
  width: 1096px; height: 1604px;
  display: grid; grid-template-columns: 528px 528px; grid-template-rows: 706px 706px; gap: 40px;
}

.photo-item { width: 528px; height: 706px; background: #000; overflow: hidden; }

/* Custom Scrollbar for Presets */
::-webkit-scrollbar { height: 4px; }
::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
::-webkit-scrollbar-thumb { background: #C80931; border-radius: 10px; }
</style>

<style>
    html,body {
    background-color: #00353A;
  }
  body::before {
    background-color: #00353A;
  }
</style>