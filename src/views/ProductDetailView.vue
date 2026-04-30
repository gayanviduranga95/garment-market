<template>
  <div class="min-h-screen px-6 py-10 bg-gray-100 dark:bg-gray-900 transition">

    <button
      class="mb-6 text-purple-600 dark:text-purple-400 hover:underline"
      @click="$router.back()"
    >
      ← Back
    </button>

    <div v-if="loading" class="text-center text-gray-500 dark:text-gray-400">
      Loading product...
    </div>

    <div
      v-else-if="product"
      class="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition"
    >
      <img
        :src="product.thumbnail"
        class="w-full h-80 object-cover rounded-xl mb-6 transition duration-300 hover:scale-105"
      />

      <h1 class="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
        {{ product.title }}
      </h1>

      <p class="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">
        $. {{ product.price }}
      </p>

      <p class="text-gray-600 dark:text-gray-300 mb-6">
        {{ product.description }}
      </p>

      <a
        href="https://wa.me/94783662585"
        target="_blank"
        class="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition"
      >
        📲 Order via WhatsApp
      </a>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Product } from '../types/Product'

const route = useRoute()
const product = ref<Product | null>(null)
const loading = ref(true)

onMounted(async () => {
  const id = route.params.id
  const res = await fetch(`https://dummyjson.com/products/${id}`)
  product.value = await res.json()
  loading.value = false
})
</script>