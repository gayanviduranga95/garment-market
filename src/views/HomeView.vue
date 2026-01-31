<template>
  <div class="p-6">
    <input
      v-model="searchText"
      type="text"
      placeholder="Search garments..."
      class="mb-6 w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
    />

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
        @view="selectedProduct = $event"
      />
    </div>

    <p
      v-if="!loading && filteredProducts.length === 0"
      class="text-gray-500 mt-6"
    >
      No garments found.
    </p>
  </div>
  <ProductDetail
  v-if="selectedProduct"
  :product="selectedProduct"
  @close="selectedProduct = null"
/>

</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import type { Product } from '../types/Product'
import ProductDetail from '../components/ProductDetail.vue'


const products = ref<Product[]>([])
const loading = ref(true)
const searchText = ref('')
const selectedProduct = ref<Product | null>(null)


const filteredProducts = computed(() => {
  const q = searchText.value.toLowerCase()
  return products.value.filter(product =>
    product.title.toLowerCase().includes(q) ||
    product.category.toLowerCase().includes(q)
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
  products.value = results.flatMap(result => result.products)
  loading.value = false
})
</script>
