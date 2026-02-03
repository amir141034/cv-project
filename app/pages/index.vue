<template>
  <div class="h-full px-4 py-6">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
        <TextForm label="Resume Input" v-model="resumeText" :disabled="!!resultText" @validity-change="updateResumeValidity"/>
        <TextForm label="Job Description" v-model="jdText"  :disabled="!!resultText" @validity-change="updateJobDescValidity"/>
      </div>
      
      <div class="flex justify-center">
        <UButton :label="`${resultText ? 'Clear Text' : 'Check Match'}`" :disabled="isButtonDisabled" @click="onCheckMatch"/>
      </div>

      <USeparator class="my-10" />
      
      <template v-if="resultText">
        <MatchResult :data="resultText" class="mt-10"/>
        <USeparator class="my-10"/>
        <HighlightJd :resumeText="resumeText" :jdText="jdText" class="mt-10"/>
      </template>
    </div>
  </div>
</template>

<script setup>

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

const onCheckMatch = () => {
  if (resultText.value) {
    resultText.value = ''
    resumeText.value = ''
    jdText.value = ''
  } else {
    const comparisonResult = compareKeywords(resumeText.value, jdText.value)
    // const detailedResult = compareKeywordsDetailed(resumeText.value, jdText.value)
    console.log(comparisonResult)
    // console.log('Weighted Score:', comparisonResult.score)
    // console.log('Simple Score:', comparisonResult.simpleScore)
    // console.log('Stats:', comparisonResult.stats)

    // //Detailed comparison with breakdown
    // console.log(detailedResult)
    // console.log('Matched by category:', detailedResult.matchedBreakdown)
    // console.log('Missing by category:', detailedResult.missingBreakdown)
    // console.log('Recommendations:', detailedResult.recommendations)

    resultText.value = comparisonResult
  }
}
</script>