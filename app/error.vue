<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center px-6">
      <h1 class="text-6xl font-bold text-gray-900 mb-4">
        {{ error.statusCode }}
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        {{ error.message }}
      </p>
      <UButton @click="handleError" label="Go back home" size="lg" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>