<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-xl p-6 max-w-md w-full relative">
      <button
        class="absolute top-2 right-2 text-gray-500"
        @click="$emit('close')"
      >
        ✕
      </button>

      <img
        :src="product.thumbnail"
        class="w-full h-60 object-cover rounded-lg mb-4"
      />

      <h2 class="text-2xl font-bold mb-2">
        {{ product.title }}
      </h2>

      <p class="text-pink-600 font-bold mb-2">
        Rs. {{ product.price }}
      </p>

      <p class="text-gray-600 mb-4">
        {{ product.description }}
      </p>

      <a
        href="https://wa.me/94783662585"
        target="_blank"
        class="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
      >
        📲 Order via WhatsApp
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../types/Product'

defineProps<{
  product: Product
}>()
</script>
