import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  runtimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL,
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/icon', 
    '@pinia/nuxt', 
    'pinia-plugin-persistedstate/nuxt',
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ]
  }
})