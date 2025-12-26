<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center gap-4 sm:gap-4 md:gap-6 lg:gap-8 font-archivo bg-[#00353A] relative overflow-hidden p-4"
  >
    <div class="pointer-events-none absolute inset-0 z-0 opacity-20">
      <div class="snow" />
    </div>

    <header
      class="relative z-10 flex flex-col justify-center items-center select-none scale-100 md:scale-100"
    >
      <div class="relative">
        <p
          class="font-archivo text-lg md:text-4xl lg:text-4xl xl:text-5xl text-white relative"
        >
          iDEKTEP
        </p>
      </div>

      <div class="relative">
        <p
          class="font-damion text-lg md:text-4xl lg:text-4xl xl:text-5xl text-[#C80931] relative -mt-5.5 md:-mt-6.5 lg:-mt-6.5 xl:-mt-7.5 drop-shadow-md"
        >
          photo booth
        </p>

        <div
          class="absolute -bottom-2 sm:-bottom-4 md:-bottom-6 lg:-bottom-6 xl:-bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 px-2 py-0.5 rounded shadow-sm"
        >
          <p
            class="text-[4px] md:text-[6px] lg:text-[6px] xl:text-[7px] uppercase text-white/90 font-medium whitespace-nowrap"
          >
            Christmas Edition
          </p>
        </div>
      </div>
    </header>

    <div
      class="grid grid-cols-1 lg:grid-cols-[120px_auto_120px] items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 relative z-10"
    >
      <div class="hidden lg:block" />

      <div
        ref="photoboothRef"
        class="relative flex flex-col items-center gap-5 p-6 transition shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-white/5 backdrop-blur-sm rounded-lg"
        :style="{
          backgroundImage: `url(${currentPreset?.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '340px',
          height: '480px',
        }"
      >
        <div class="grid grid-cols-2 gap-4 w-full z-10 -mt-2">
          <div
            v-for="(img, index) in images"
            :key="index"
            class="w-full aspect-1 overflow-hidden bg-black shadow-inner"
          >
            <img :src="img" class="w-full h-full object-cover" alt="" >
          </div>
        </div>

        <img
          :src="currentPreset?.frame"
          class="absolute inset-0 w-full h-full object-cover pointer-events-none z-20"
        />
      </div>

      <div
        class="flex flex-row justify-center lg:flex-col gap-4 overflow-x-auto py-2"
      >
        <div
          v-for="(preset, index) in presets"
          :key="index"
          class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border-2 cursor-pointer transition-all duration-300 hover:scale-110 flex-shrink-0 p-0.5"
          :class="
            selectedPreset === index
              ? 'border-[#C80931] bg-[#C80931]'
              : 'border-white/20 bg-white/5'
          "
          @click="selectPreset(index)"
        >
          <div
            class="w-full h-full rounded-full bg-cover bg-center"
            :style="{ backgroundImage: `url(${preset.thumbnail})` }"
          />
        </div>
      </div>
    </div>

    <!-- Container ปุ่ม -->
    <div class="flex gap-6 relative z-10 mb-16">
      <!-- เพิ่ม mb-16 หรือ px-6 ให้เว้นที่ footer -->
      <button
        class="group w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-all hover:bg-[#C80931] hover:border-[#C80931]"
        title="Share"
        :disabled="isProcessing"
        @click="handleShare"
      >
        <i
          class="fi-rr-share text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl text-white group-hover:scale-110 transition-transform"
        />
      </button>

      <button
        class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-[#C80931] text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg"
        @click="handleFinish"
      >
        <i class="fi-rr-check text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl" />
      </button>

      <button
        class="group w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-all hover:bg-[#C80931] hover:border-[#C80931]"
        title="Download"
        :disabled="isProcessing"
        @click="handleDownload"
      >
        <i
          class="fi-rr-download text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl text-white group-hover:scale-110 transition-transform"
        />
      </button>
    </div>

    <!-- Footer -->
    <footer
      class="absolute bottom-10 md:bottom-6 z-50 text-[7px] sm:text-[8px] md:text-[8px] lg:text-[10px] xl:text-[10px] text-white/20 tracking-[0.4em] uppercase"
    >
      Copyright © 2025 iDektep. All rights reserved.
    </footer>

    <div
      ref="exportRef"
      class="export-root"
      :style="{ backgroundImage: `url(${currentPreset?.background})` }"
    >
      <div class="photo-grid">
        <div v-for="(img, index) in images" :key="index" class="photo-item">
          <img :src="img" class="w-full h-full object-cover" />
        </div>
      </div>
      <img
        :src="currentPreset?.frame"
        class="absolute inset-0 w-full h-full object-cover z-[100]"
      />
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
  {
    id: 1,
    name: "Default",
    background: "/img/xmas/bg1.png",
    frame: "/img/xmas/frame1.png",
    thumbnail: "/img/xmas/bg1.png",
  },
  {
    id: 2,
    name: "Preset 2",
    background: "/img/xmas/bg2.png",
    frame: "/img/xmas/frame2.png",
    thumbnail: "/img/xmas/bg2.png",
  },
  {
    id: 3,
    name: "Preset 3",
    background: "/img/xmas/bg3.png",
    frame: "/img/xmas/frame3.png",
    thumbnail: "/img/xmas/bg3.png",
  },
  {
    id: 4,
    name: "Preset 4",
    background: "/img/xmas/bg4.png",
    frame: "/img/xmas/frame4.png",
    thumbnail: "/img/xmas/bg4.png",
  },
  {
    id: 5,
    name: "Preset 5",
    background: "/img/xmas/bg5.png",
    frame: "/img/xmas/frame5.png",
    thumbnail: "/img/xmas/bg5.png",
  },
]);

const currentPreset = computed(
  () => presets.value[selectedPreset.value] || presets.value[0]
);
const selectPreset = (index: number) => {
  selectedPreset.value = index;
};

const handleFinish = async () => {
  isProcessing.value = true;

  try {
    const blob = await capturePhotobooth();
    if (blob) {
      const fd = new FormData();
      // แก้ไขตรงนี้: ใส่เครื่องหมาย ` ` หรือ ' ' ครอบชื่อไฟล์
      fd.append("file", blob, `idektep-photobooth-${Date.now()}.png`);

      const response = await fetch(
        "https://idektep-photobooth-backend.onrender.com/upload",
        {
          method: "POST",
          body: fd,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Upload failed:", errorData.error);
        alert("Upload failed: " + errorData.error);
      } else {
        console.log("Upload success!");
      }
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    isProcessing.value = false;
    sessionStorage.clear();
    router.replace("/");
  }
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

  const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((res, rej) => {
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
      ctx.drawImage(
        img,
        cfg.left + col * (cfg.w + cfg.gap),
        cfg.top + row * (cfg.h + cfg.gap),
        cfg.w,
        cfg.h
      );
    }
  }

  if (currentPreset.value?.frame) {
    const fr = await loadImage(currentPreset.value.frame);
    ctx.drawImage(fr, 0, 0, width, height);
  }

  return new Promise((res) => canvas.toBlob((b) => res(b), "image/png", 1.0));
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
    await navigator.share({ files: [file], title: "iDEKTEP" }).catch(() => {});
  }
  isProcessing.value = false;
};

onMounted(() => {
  const data = sessionStorage.getItem("photoboothImages");
  if (data) images.value = JSON.parse(data);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Damion&display=swap");

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
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(50%);
  }
}

.export-root {
  width: 1240px;
  height: 1748px;
  position: fixed;
  left: -9999px;
  background-size: cover;
}

.photo-grid {
  position: absolute;
  top: 72px;
  left: 72px;
  width: 1096px;
  height: 1604px;
  display: grid;
  grid-template-columns: 528px 528px;
  grid-template-rows: 706px 706px;
  gap: 40px;
}

.photo-item {
  width: 528px;
  height: 706px;
  background: #000;
  overflow: hidden;
}

/* Custom Scrollbar for Presets */
::-webkit-scrollbar {
  height: 4px;
}
::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}
::-webkit-scrollbar-thumb {
  background: #c80931;
  border-radius: 10px;
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
