<template>
  <div class="max-w-2xl mx-auto p-6">
    <UForm :state="state" @submit="onSubmit" class="space-y-4">
      <UFormGroup label="Message" name="message" required>
        <UTextarea
          v-model="state.message"
          placeholder="Enter your message here..."
          :rows="6"
          autoresize
        />
      </UFormGroup>

      <UButton type="submit" color="primary">
        Submit
      </UButton>
    </UForm>
  </div>
</template>

<script setup>
const state = reactive({
  message: ''
})

const onSubmit = (event) => {
  console.log('Form submitted:', state.message)
  // Handle your form submission here
}
</script>