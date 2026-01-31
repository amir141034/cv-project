<template>
  <div
    class="whitespace-pre-wrap text-sm leading-relaxed"
    v-html="highlightedJD"
  />
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