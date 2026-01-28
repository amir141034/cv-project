<template>
  <div class="h-full px-4 py-6">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
        <TextForm label="Resume Input" v-model="resumeText"/>
        <TextForm label="Job Description" v-model="jobDescText"/>
      </div>
      
      <div class="flex justify-center">
        <UButton label="Check Match" :disabled="isButtonDisabled"/>
      </div>
      
      <div class="mt-10">
        <MatchResult />
      </div>
    </div>
  </div>
</template>

<script setup>
const maxWords = 200
const resumeText = ref('')
const jobDescText = ref('')

const isButtonDisabled = computed(() => {
  const resumeWords = resumeText.value.trim().split(/\s+/).length
  const jobDescWords = jobDescText.value.trim().split(/\s+/).length
  
  return resumeWords === 0 || resumeWords > maxWords || 
         jobDescWords === 0 || jobDescWords > maxWords
})
</script>