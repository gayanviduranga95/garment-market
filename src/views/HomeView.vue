<template>
   <input
  v-model="searchText"
  type="text"
  placeholder="Search garments..."
  class="mb-6 w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
/>
 
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-6">Latest Garments</h2>

    <div v-if="loading">Loading garments...</div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
    >
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import type { Product } from '../types/Product'

const products = ref<Product[]>([])
const loading = ref(true)
const searchText = ref('')

const filteredProducts = computed(() => {
  const query = searchText.value.toLowerCase()

  return products.value.filter(product =>
    product.title.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  )
})

onMounted(async () => {
  const categories = [
    'mens-shirts',
    'womens-dresses',
    'tops',
    'mens-shoes',
    'womens-shoes'
  ]

  const requests = categories.map(category =>
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then(res => res.json())
  )

  const results = await Promise.all(requests)

  console.log('RESULTS:', results)
  console.log(
    'TOTAL PRODUCTS:',
    results.flatMap(r => r.products).length
  )

  products.value = results.flatMap(result => result.products)
  loading.value = false
})

</script>

