<template>
  <UFileUpload
    v-model="files"
    :multiple="false"
    accept="application/pdf"
    label="Drop your resume here"
    description="PDF only (max. 2MB)"
    class="w-96 min-h-48"
  >
    <template #default="{ files: uploadedFiles }">
      <div
        v-if="uploadedFiles && uploadedFiles.length > 0"
        class="flex flex-col items-center justify-center gap-2 text-center"
      >
        <UIcon
          name="i-heroicons-document-text"
          class="text-primary text-4xl"
        />

        <p class="font-medium">
          {{ uploadedFiles[0].name }}
        </p>

        <p class="text-sm text-gray-500">
          {{ (uploadedFiles[0].size / 1024).toFixed(1) }} KB
        </p>

        <p class="text-xs text-green-600">
          ✓ File uploaded (click to replace)
        </p>
      </div>
    </template>
  </UFileUpload>
</template>

<script setup>
const files = ref([])
</script>