<template>
  <div class="max-w-5xl mx-auto px-6 py-10">
    <h1 class="text-3xl font-bold mb-6">Your Cart</h1>

    <div v-if="cart.items.length === 0" class="text-gray-500">
      Your cart is empty.
    </div>

    <div v-else>
      <div
        v-for="item in cart.items"
        :key="item.id"
        class="flex justify-between items-center bg-purple-50 p-4 rounded-lg shadow mb-4"
      >
        <div>
          <h2 class="font-semibold">{{ item.title }}</h2>
          <p class="text-purple-600">$. {{ item.price }}</p>
        </div>

        <button
          @click="cart.removeFromCart(item.id)"
          class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Remove
        </button>
      </div>

      <div class="text-right mt-6">
        <h2 class="text-xl font-bold">
          Total: $. {{ cart.total }}
        </h2>

        <button
          @click="cart.clearCart()"
          class="mt-4 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900"
        >
          Clear Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
</script>