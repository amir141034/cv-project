<template>
  <h2 class="text-2xl font-bold mb-2">Highlighted Job Description</h2>
  <UCard  variant="soft" class="mx-auto my-4 max-w-4xl">
      <div
      class="whitespace-pre-wrap text-sm leading-relaxed"
      v-html="highlightedJD"
    />
  </UCard>
</template>

<script setup>
import { computed } from 'vue'
import { highlightMissingKeywords } from '@/utils/textProcessing.js'
import { compareKeywords } from '@/utils/keywordMatcher.js'

const props = defineProps({
  resumeText: {
    type: String,
    required: true
  },
  jdText: {
    type: String,
    required: true
  }
})

const highlightedJD = computed(() => {
  const result = compareKeywords(props.resumeText, props.jdText)
  return highlightMissingKeywords(props.jdText, result.missing)
})
</script>