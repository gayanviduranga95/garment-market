<template>
  <nav class="bg-purple-600 bg-opacity-50 text-white px-6 py-4">
    <div class="max-w-7xl mx-auto flex items-center justify-between">

      <!-- Logo -->
      <h1 class="text-xl font-bold">
        VAJIRA CLOTHING
      </h1>

      <!-- Right side -->
      <div class="flex items-center space-x-6 font-semibold">

        <router-link to="/" class="hover:underline">
          Home
        </router-link>

        <router-link to="/about" class="hover:underline">
          About
        </router-link>

        <router-link to="/cart" class="relative hover:underline">
  Cart
  <span
    v-if="cart.count > 0"
    class="ml-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full"
  >
    {{ cart.count }}
  </span>
</router-link>

      </div>

    </div>
  </nav>
</template>

<script setup lang="ts">
  import { useCartStore } from '../stores/cart';
  const cart = useCartStore();
</script>
