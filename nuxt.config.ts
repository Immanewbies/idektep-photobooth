// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  ssr: false, // disable server-side rendering
  nitro: { preset: "static" }, // generate static site for Render
  app: {
    head: {
      title: "iDEKTEP PHOTOBOOTH",
      link: [{ rel: "icon", type: "image/x-icon", href: "/idektep.ico" }],
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"], 
  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@nuxt/content",
  ],
});
