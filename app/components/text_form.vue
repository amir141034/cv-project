<template>
  <div>
    <h3 class="text-xl font-semibold mb-4">{{ label }}</h3>
    <UTextarea
      v-model="state.message"
      placeholder="Paste text here"
      class="w-full min-w-50"
      :rows="6"
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

const state = reactive({
  message: props.modelValue || ''
})

watch(() => state.message, (newValue) => {
  emit('update:modelValue', newValue)
  emit('text-submitted', newValue)
})
</script>