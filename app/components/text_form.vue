<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-semibold">{{ label }}</h3>
      <div class="text-sm text-gray-500">
        <span>{{ wordCount }}/{{ maxWords }} words</span>
      </div>
    </div>
    <UTextarea
      v-model="state.message"
      placeholder="Paste text here"
      class="w-full min-w-50"
      :rows="6"
      :maxrows="20"
      :color="isValid ? undefined : 'error'"
      autoresize
    />
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  modelValue: String
})
const emit = defineEmits(['update:modelValue', 'text-submitted'])

const maxWords = 200
const isValid = computed(() => wordCount.value <= maxWords)

const state = reactive({
  message: props.modelValue || ''
})

const wordCount = computed(() => {
  return state.message.trim().length === 0 
    ? 0 
    : state.message.trim().split(/\s+/).length
})

watch(() => state.message, (newValue) => {
  emit('update:modelValue', newValue)
  emit('text-submitted', newValue)
})
</script>