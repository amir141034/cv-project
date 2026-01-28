export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/ui'],
  compatibilityDate: '2025-01-15', // Fixed date format
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Resume Checker',
      meta: [
        { name: 'application-name', content: 'Resume Checker' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
      ]
    }
  }
})
