<template>
  <div class="p-6 max-w-3xl mx-auto">
    <button
      class="mb-4 text-pink-600 underline"
      @click="$router.back()"
    >
      ← Back
    </button>

    <div v-if="loading">
      Loading product...
    </div>

    <div v-else-if="product">
      <img
        :src="product.thumbnail"
        class="w-full h-80 object-cover rounded-lg mb-6"
      />

      <h1 class="text-3xl font-bold mb-2">
        {{ product.title }}
      </h1>

      <p class="text-pink-600 text-xl font-bold mb-4">
        Rs. {{ product.price }}
      </p>

      <p class="text-gray-700">
        {{ product.description }}
      </p>
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
