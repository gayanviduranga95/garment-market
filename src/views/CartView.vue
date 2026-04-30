<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition">
    
    <div class="max-w-5xl mx-auto px-6 py-10">

      <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Your Cart
      </h1>

      <div
        v-if="cart.items.length === 0"
        class="text-gray-500 dark:text-gray-400 text-center mt-10"
      >
        Your cart is empty.
      </div>

      <div v-else>
        <div
          v-for="item in cart.items"
          :key="item.id"
          class="flex justify-between items-center bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition mb-5"
        >
          <div>
            <h2 class="font-semibold text-gray-800 dark:text-white">
              {{ item.title }}
            </h2>

            <p class="text-purple-600 dark:text-purple-400 font-semibold">
              $. {{ item.price }}
            </p>
          </div>

          <button
            @click="cart.removeFromCart(item.id)"
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Remove
          </button>
        </div>

        <div
          class="mt-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md text-right"
        >
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">
            Total: $. {{ cart.total }}
          </h2>

          <button
            @click="cart.clearCart()"
            class="mt-4 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition"
          >
            Clear Cart
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
</script>