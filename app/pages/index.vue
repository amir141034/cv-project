<template>
  <div class="min-h-screen px-4 py-6 overflow-x-hidden">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
        <TextForm label="Resume Input"/>
        <TextForm label="Job Description"/>
      </div>
      
      <div class="flex justify-center">
        <UButton label="Check Match" />
      </div>
      
      <div class="mt-10">
        <MatchResult />
      </div>
    </div>
  </div>
</template>

<script>
</script>