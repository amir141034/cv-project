<template>
    <h2 class="text-2xl font-bold mb-2">Match Result</h2>
    <UProgress v-model="displayScore" status />
    <p class="text-lg">
        Your resume matches <span class="font-semibold text-green-600">{{ displayScore }}%</span> of the job description.
    </p>
    <div class="flex w-full justify-around mt-6">
        <div class="border border-gray-300 p-4 rounded-lg w-100">
            <h3 class="text-xl font-semibold mb-2">Matched Keywords:</h3>
            <ul class="list-disc list-inside">
                <li v-for="keyword in data.matched" :key="keyword">{{ keyword }}</li>
            </ul>
            <p v-if="data.matched.length === 0" class="text-gray-500">No matched keywords found.</p>
        </div>
        <div class="border border-gray-300 p-4 rounded-lg w-100">
            <h3 class="text-xl font-semibold mb-2">Missing Keywords:</h3>
            <ul class="list-disc list-inside">
                <li v-for="keyword in data.missing" :key="keyword">{{ keyword }}</li>
            </ul>
            <p v-if="data.missing.length === 0" class="text-gray-500">No missing keywords. Great job!</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data :{
        type: Object,
        required: true
    }
})

const displayScore = ref(0)

onMounted(() => {
  const duration = 1500 // 1.5 seconds
  const steps = 60
  const increment = props.data.score / steps
  const stepDuration = duration / steps
  
  let currentStep = 0
  const interval = setInterval(() => {
    currentStep++
    displayScore.value = Math.min(
      Math.round(increment * currentStep),
      props.data.score
    )
    
    if (currentStep >= steps) {
      clearInterval(interval)
      displayScore.value = props.data.score // Ensure exact final value
    }
  }, stepDuration)
})
</script>