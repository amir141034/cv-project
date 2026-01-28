<template>
  <div>
    <h3 class="text-xl font-semibold mb-4">{{ label }}</h3>
    <UForm :state="state" @submit="onSubmit">
      <UFormGroup label="Message" name="message" required>
        <UTextarea
          v-model="state.message"
          placeholder="Enter your message here..."
          :rows="6"
          class="w-full min-w-100" 
          autoresize
        />
      </UFormGroup>

      <h3 class="mt-4">{{ state.message }}</h3>
    </UForm>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: 'Input'
  }
})

const state = reactive({
  message: ''
})

// const onSubmit = (event) => {
//   console.log('Form submitted:', state.message)
//   // Handle your form submission here
// }
</script>