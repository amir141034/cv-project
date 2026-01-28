<template>
  <div class="h-full px-4 py-6">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
        <TextForm label="Resume Input" v-model="resumeText" @validity-change="updateResumeValidity"/>
        <TextForm label="Job Description" v-model="jobDescText" @validity-change="updateJobDescValidity"/>
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
const resumeText = ref('')
const jobDescText = ref('')
const isResumeValid = ref(false)
const isJobDescValid = ref(false)

const isButtonDisabled = computed(() => {
  return !isResumeValid.value || !isJobDescValid.value
})

const updateResumeValidity = (valid) => {
  isResumeValid.value = valid
}

const updateJobDescValidity = (valid) => {
  isJobDescValid.value = valid
}
</script>