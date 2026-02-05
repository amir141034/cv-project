export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/ui'],
  compatibilityDate: '2025-01-15', // Fixed date format
  devtools: { enabled: true },
  app: {
    head: {
      title: "Resume Keyword Checker",
      meta: [
        { name: "description", content: "Check how well your resume matches a job description" }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
      ]
    }
  }
})
