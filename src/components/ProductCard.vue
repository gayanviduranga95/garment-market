<template>
  <div class="bg-purple-100 rounded-xl shadow hover:shadow-lg transition p-4">
    <img
      :src="product.thumbnail"
      alt="product image"
      class="w-full h-48 object-cover rounded-lg mb-3"
    />

    <h2 class="font-semibold text-lg">
      {{ product.title }}
    </h2>

    <p class="text-purple-600 font-bold mt-1">
      $. {{ product.price }}
    </p>
    <button
      @click="cartStore.addToCart(product)"
      class="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
> Add to Cart</button>
   <button
  @click="$router.push(`/product/${product.id}`)"
  class="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
>
  View Details
</button>

  </div>
</template>

<script setup lang="ts">
import type { Product } from '../types/Product'
import { useCartStore } from '../stores/cart';
const cartStore = useCartStore();

defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  (e: 'view', product: Product): void
}>()
</script>
