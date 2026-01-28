export default {
  content: {
    files: [
      './components/**/*.{vue,js,ts}',
      './layouts/**/*.{vue,js,ts}',
      './pages/**/*.{vue,js,ts}',
      './app.vue',
      './plugins/**/*.{js,ts}',
      './composables/**/*.{js,ts}',
    ],
    safelist: [
      'bg-gray-100',
      'bg-gray-50',
      'text-gray-900',
      'text-blue-600',
      'hover:text-blue-800',
    ],
  },
  theme: {
    extend: {},
  },
}



