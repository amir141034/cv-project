// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/main.css'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Resume Checker',
      meta: [
        { name: 'application-name', content: 'Resume Checker' } // PWA meta tag
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
      ]
    }
  }
})
