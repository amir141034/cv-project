<template>
    <h2 class="text-2xl font-bold mb-2">Match Result</h2>
    <UProgress v-model="value" status />
    <p class="text-lg">
        Your resume matches <span class="font-semibold text-green-600">{{ value }}%</span> of the job description.
    </p>
    <div class="flex w-full justify-between mt-6">
        <div>
            <h3 class="text-xl font-semibold mb-2">Matched Keywords:</h3>
            <ul class="list-disc list-inside">
                <li>JavaScript</li>
                <li>Vue.js</li>
                <li>Project Management</li>
                <li>Communication Skills</li>
            </ul>
        </div>
        <div>
            <h3 class="text-xl font-semibold mb-2">Missing Keywords:</h3>
            <ul class="list-disc list-inside">
                <li>Machine Learning</li>
                <li>Deep Learning</li>
                <li>Python</li>
            </ul>
        </div>
    </div>
    <div class="mt-6">
        <h3 class="text-xl font-semibold mb-2">Highlights:</h3>
        <ul class="list-disc list-inside">
            <li>Strong experience in JavaScript and Vue.js</li>
            <li>Relevant project management skills</li>
            <li>Excellent communication abilities</li>
        </ul>
    </div>
    <div class="mt-4">
        <h3 class="text-xl font-semibold mb-2">Suggestions:</h3>
        <ul class="list-disc list-inside">
            <li>Include more keywords from the job description</li>
            <li>Highlight specific achievements in previous roles</li>
            <li>Emphasize relevant certifications or training</li>
        </ul>
    </div>
</template>

<script setup>
const value = ref(50)
</script>