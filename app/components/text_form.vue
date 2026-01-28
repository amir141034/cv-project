<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-semibold">{{ label }}</h3>
      <div class="text-sm text-gray-500">
        <span>{{ wordCount }}/{{ maxWords }} words</span>
      </div>
    </div>
    <UTextarea
        v-model="text"
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
  modelValue: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue', 'text-submitted', 'validity-change'])

const maxWords = 200

const text = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
    emit('text-submitted', value)
    emit('validity-change', isValid.value)
  }
})

const wordCount = computed(() => {
  return text.value.trim().length === 0 
    ? 0 
    : text.value.trim().split(/\s+/).length
})

const isValid = computed(() => wordCount.value <= maxWords)
</script>