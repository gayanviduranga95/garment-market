<template>
  <div class="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
    <img
      :src="product.thumbnail"
      alt="product image"
      class="w-full h-48 object-cover rounded-lg mb-3"
    />

    <h2 class="font-semibold text-lg">{{ product.title }}</h2>

    <p class="text-pink-600 font-bold mt-1">
      Rs. {{product.price}}
    </p>

    <button
      class="mt-3 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700"
    >
      View Details
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../types/Product'

defineProps<{
  product: Product
}>()
</script>
