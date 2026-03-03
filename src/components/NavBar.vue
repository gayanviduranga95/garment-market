<template>
  <nav class="bg-purple-600 bg-opacity-50 text-white px-6 py-4 flex justify-between items-center">
    <h1 class="text-xl font-bold">VAJIRA CLOTHING</h1>

    <div class="space-x-4">
      <button class="hover:underline">Home</button>
      <button class="hover:underline">About</button>
    </div>
    <div class="font-semibold">
      Cart({{ cart.count }})
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { useCartStore } from '../stores/cart';
  const cart = useCartStore();
</script>
