<template>
  <div class="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
    <img
      :src="image"
      alt="product image"
      class="w-full h-48 object-cover rounded-lg mb-3"
    />

    <h2 class="font-semibold text-lg">{{ title }}</h2>

    <p class="text-pink-600 font-bold mt-1">
      Rs. {{ price }}
    </p>

    <button
      class="mt-3 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700"
    >
      View Details
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  price: number
  image: string
}>()
</script>
