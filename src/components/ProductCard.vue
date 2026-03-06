<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden
    transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
  >

    <!-- Image Area -->
    <div class="bg-gray-100 dark:bg-gray-700 p-6 flex justify-center">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="h-40 object-contain transition duration-300 hover:scale-110"
      />
    </div>

    <!-- Info Area -->
    <div class="p-4">

      <!-- Title -->
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
        {{ product.title }}
      </h3>

      <!-- Category -->
      <p class="text-sm text-gray-500 dark:text-gray-300 mb-2">
        {{ product.category }}
      </p>

      <!-- Price -->
      <p class="text-xl font-bold text-black dark:text-white mb-4">
        ${{ product.price }}
      </p>

      <!-- Buttons -->
      <div class="flex gap-2">

        <!-- Add to Cart -->
        <button
          @click="addToCart"
          class="flex-1 bg-black hover:bg-gray-800 text-white py-2 rounded-lg transition"
        >
          Add to Cart
        </button>

        <!-- View Details -->
        <router-link
          :to="`/product/${product.id}`"
          class="flex-1 text-center border border-gray-300 dark:border-gray-600
          py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          Details
        </router-link>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "../stores/cart"
import type { Product } from "../types/Product"

const { product } = defineProps<{
  product: Product
}>()

const cart = useCartStore()

function addToCart() {
  cart.add(product)
}
</script>