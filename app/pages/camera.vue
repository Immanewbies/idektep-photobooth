<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center gap-4 sm:gap-4 md:gap-6 lg:gap-8 font-archivo relative overflow-hidden p-4"
  >

  <div></div>
    <!-- Header -->
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
          class="font-damion text-lg md:text-4xl lg:text-4xl xl:text-5xl text-idt2 relative -mt-5.5 md:-mt-6.5 lg:-mt-6.5 xl:-mt-7.5 drop-shadow-md"
        >
          photo booth
        </p>
      </div>
    </header>

    <!-- Main content -->
    <div
      class="w-full max-w-6xl relative z-10 flex flex-col justify-center items-center md:items-center gap-6"
    >

      <!-- Center: video + capture button -->
      <div class="flex flex-col items-center gap-6">
        <div
          class="relative w-[320px] h-[452px] md:w-[493px] md:h-[698px] lg:w-[420px] lg:h-[625px] xl:w-[620px] xl:h-[850px] bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 flex flex-col justify-center items-center"
        >
          <!-- Photo index -->
          <div
            class="absolute top-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1 rounded-full text-sm font-bold z-20 flex items-center gap-2"
          >
            <span class="w-2 h-2 rounded-full bg-[#C80931] animate-pulse" />
            {{ currentPhotoIndex }} / 4
          </div>

          <!-- Video -->
          <video
            ref="videoRef"
            autoplay
            playsinline
            muted
            class="w-full h-full object-cover scale-x-[-1] transition-filter duration-500"
            :class="{ 'blur-[2px] brightness-110': showCountdown && countdown === 1 }"
            :style="videoStyle"
          />

          <!-- Countdown -->
          <div
            v-if="showCountdown"
            class="absolute inset-0 flex items-center justify-center text-white text-9xl font-bold bg-black/40 z-30 font-archivo"
          >
            <span
              class="drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] animate-ping-slow"
            >
              {{ countdown }}
            </span>
          </div>

          <!-- Preview -->
          <div
            v-if="showPreview && lastCapturedImage"
            class="absolute inset-0 bg-black flex items-center justify-center z-20 scale-x-[-1]"
          >
            <img
              :src="lastCapturedImage"
              class="w-full h-full object-cover scale-x-[-1]"
              :style="previewStyle"
              alt="Preview"
            >
            <div class="absolute inset-0 bg-white animate-flash pointer-events-none" />
          </div>

          <!-- Capture button -->
          <div
            class="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-40"
          >
            <button
              :disabled="!cameraOn || isCapturing"
              class="relative group flex items-center justify-center"
              @click="startPhotoSequence"
            >
              <div
                class="absolute inset-0 rounded-full border-2 border-white/40 scale-110 transition-transform group-hover:scale-125"
                :class="{ 'border-[#C80931]': isCapturing }"
              />
              <div
                class="w-16 h-16 rounded-full transition-all duration-300 flex items-center justify-center shadow-xl"
                :class="[isCapturing ? 'bg-[#C80931] scale-90' : 'bg-white hover:bg-white/90', !cameraOn && 'opacity-50 cursor-not-allowed']"
              >
                <div v-if="!isCapturing" class="w-12 h-12 rounded-full border border-[#00353A]/10" />
                <span v-else class="text-white text-[10px] font-bold animate-pulse tracking-tighter">SHOT</span>
              </div>
            </button>
            <p class="text-white/60 text-[8px] uppercase tracking-[0.3em] font-bold drop-shadow-md">
              Start Sequence
            </p>
          </div>
        </div>
      </div>

      <div></div>
    </div>

    <!-- Footer -->
    <footer class="absolute bottom-10 md:bottom-6 z-50 text-[7px] sm:text-[8px] md:text-[8px] lg:text-[10px] xl:text-[10px] text-white/20 tracking-[0.4em] uppercase">
      Copyright © 2025 iDektep. All rights reserved.
    </footer>

    <!-- Filters -->
    <svg xmlns="http://www.w3.org/2000/svg" class="hidden">
      <defs>
        <filter id="blurX"><feGaussianBlur stdDeviation="8 0" /></filter>
        <filter id="blurXBW">
          <feGaussianBlur stdDeviation="8 0" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <filter id="generalBlur"><feGaussianBlur stdDeviation="8" /></filter>
      </defs>
    </svg>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onUnmounted, onMounted } from "vue";
import { useRouter } from "vue-router";

// Settings
const PHOTO_COUNT = 4;
const COUNTDOWN_DURATION = 3;
const PREVIEW_DURATION = 1500;
const CAPTURE_WIDTH = 600;
const CAPTURE_QUALITY = 1;
// const CAPTURE_ZOOM = 1;

// State
const router = useRouter();
const cameraOn = ref(false);
const isCapturing = ref(false);
// const isFestive = ref(false); // Easter Egg state
const videoRef = ref<HTMLVideoElement | null>(null);
const countdown = ref(COUNTDOWN_DURATION);
const showCountdown = ref(false);
const capturedImages = ref<string[]>([]);
const showPreview = ref(false);
const lastCapturedImage = ref<string | null>(null);
const currentPhotoIndex = ref(0);
const selectedFilter = ref("none");

let mediaStream: MediaStream | null = null;

// Utility functions
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const getFilterStyle = (filterValue: string): string => {
  switch (filterValue) {
    case "blurX":
      return "filter: url('#blurX')";
    case "blurXBW":
      return "filter: url('#blurXBW')";
    case "blur":
      return "filter: url('#generalBlur')";
    case "mono":
      return "filter: grayscale(100%)";
    default:
      return "filter: none";
  }
};

const videoStyle = computed(() => getFilterStyle(selectedFilter.value));
const previewStyle = computed(() => getFilterStyle(selectedFilter.value));

// Core Logic
const startCamera = async () => {
  try {
    cameraOn.value = true;
    mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 1920 },
        height: { ideal: 1080 },
      },
      audio: false,
    });
    if (videoRef.value) {
      videoRef.value.srcObject = mediaStream;
      await videoRef.value.play();
    }
  } catch (error) {
    console.error("Camera access failed:", error);
    cameraOn.value = false;
  }
};

const stopCamera = () => {
  mediaStream?.getTracks().forEach((track) => track.stop());
  mediaStream = null;
  cameraOn.value = false;
};

const capturePhoto = () => {
  if (!videoRef.value) return;
  const video = videoRef.value;
  const canvas = document.createElement("canvas");
  const height = Math.floor((1748 / 1240) * CAPTURE_WIDTH);
  canvas.width = CAPTURE_WIDTH;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.filter = getFilterStyle(selectedFilter.value).replace(/filter:\s*/, "");

  // Crop and Center
  const videoRatio = video.videoWidth / video.videoHeight;
  const canvasRatio = CAPTURE_WIDTH / height;
  let sx = 0,
    sy = 0,
    sWidth = video.videoWidth,
    sHeight = video.videoHeight;

  if (videoRatio > canvasRatio) {
    sWidth = video.videoHeight * canvasRatio;
    sx = (video.videoWidth - sWidth) / 2;
  } else {
    sHeight = video.videoWidth / canvasRatio;
    sy = (video.videoHeight - sHeight) / 2;
  }

  ctx.translate(CAPTURE_WIDTH, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, CAPTURE_WIDTH, height);

  capturedImages.value.push(canvas.toDataURL("image/jpeg", CAPTURE_QUALITY));
};

const startPhotoSequence = async () => {
  if (!cameraOn.value || isCapturing.value) return;
  isCapturing.value = true;
  capturedImages.value = [];

  try {
    for (let i = 0; i < PHOTO_COUNT; i++) {
      currentPhotoIndex.value = i + 1;
      showCountdown.value = true;
      countdown.value = COUNTDOWN_DURATION;

      // Timer Loop
      while (countdown.value > 0) {
        await delay(1000);
        countdown.value--;
      }

      await delay(500);
      showCountdown.value = false;
      capturePhoto();

      lastCapturedImage.value =
        capturedImages.value[capturedImages.value.length - 1] ?? null;
      showPreview.value = true;
      await delay(PREVIEW_DURATION);
      showPreview.value = false;

      if (i < PHOTO_COUNT - 1) await delay(500);
    }

    sessionStorage.setItem(
      "photoboothImages",
      JSON.stringify(capturedImages.value)
    );
    stopCamera();
    router.push("/photobooth");
  } catch (err) {
    console.error(err);
  } finally {
    isCapturing.value = false;
  }
};

onMounted(() => startCamera());
onUnmounted(() => stopCamera());
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Damion&display=swap");

/* Performance-optimized Snow */
.snow {
  background: radial-gradient(circle at center, #fff 1px, transparent 1px);
  background-size: 60px 60px;
  width: 100%;
  height: 200%;
  position: absolute;
  top: -100%;
  animation: snowfall 25s linear infinite;
}

@keyframes snowfall {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(50%);
  }
}

@keyframes flash {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes bounce-short {
  0%,
  100% {
    transform: translateY(0) rotate(-12deg);
  }
  50% {
    transform: translateY(-8px) rotate(-18deg);
  }
}

.animate-flash {
  animation: flash 0.6s ease-out forwards;
}
.animate-bounce-short {
  animation: bounce-short 2s ease-in-out infinite;
}
.animate-ping-slow {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
.animate-bounce-slow {
  animation: bounce 4s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
</style>
