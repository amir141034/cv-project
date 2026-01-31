<template>
  <div class="h-full px-4 py-6">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
        <TextForm label="Resume Input" v-model="resumeText" :disabled="!!resultText" @validity-change="updateResumeValidity"/>
        <TextForm label="Job Description" v-model="jdText"  :disabled="!!resultText" @validity-change="updateJobDescValidity"/>
      </div>
      
      <div class="flex justify-center">
        <UButton :label="`${resultText ? 'Clear Text' : 'Check Match'}`" :disabled="isButtonDisabled" @click="onClick"/>
      </div>
      
      <template v-if="resultText">
        <div class="mt-10">
          <MatchResult :data="resultText"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
const {compareKeywords} = useExtractionLogic()
const resultText = ref('')
const resumeText = ref('')
const jdText = ref('')
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

const onClick = () => {
  if (resultText.value) {
    resultText.value = ''
    resumeText.value = ''
    jdText.value = ''
  } else {
    const comparisonResult = compareKeywords(resumeText.value, jdText.value)
    resultText.value = comparisonResult
  }
}

// const result = compareKeywords(resumeText, jdText);

// const highlightedJD = highlightMissingKeywords(
//   jdText,
//   result.missing
// );
</script>