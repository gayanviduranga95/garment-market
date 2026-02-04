<template>
  <div class="flex flex-wrap gap-3 mb-6">
  <button
    @click="selectedCategory = 'all'"
    :class="selectedCategory === 'all' ? 'bg-pink-600 text-white' : 'bg-gray-200'"
    class="px-4 py-2 rounded-lg"
  >
    All
  </button>

  <button
    @click="selectedCategory = 'mens-shirts'"
    :class="selectedCategory === 'mens-shirts' ? 'bg-pink-600 text-white' : 'bg-gray-200'"
    class="px-4 py-2 rounded-lg"
  >
    Men
  </button>

  <button
    @click="selectedCategory = 'womens-dresses'"
    :class="selectedCategory === 'womens-dresses' ? 'bg-pink-600 text-white' : 'bg-gray-200'"
    class="px-4 py-2 rounded-lg"
  >
    Women
  </button>

  <button
    @click="selectedCategory = 'mens-shoes'"
    :class="selectedCategory === 'mens-shoes' ? 'bg-pink-600 text-white' : 'bg-gray-200'"
    class="px-4 py-2 rounded-lg"
  >
    Shoes
  </button>

  <button
    @click="selectedCategory = 'tops'"
    :class="selectedCategory === 'tops' ? 'bg-pink-600 text-white' : 'bg-gray-200'"
    class="px-4 py-2 rounded-lg"
  >
    Tops
  </button>
</div>

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
const selectedCategory = ref('all')

const filteredProducts = computed(() => {
  const query = searchText.value.toLowerCase()

  return products.value.filter(product => {
    const matchesSearch =
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)

    const matchesCategory =
      selectedCategory.value === 'all' ||
      product.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
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
