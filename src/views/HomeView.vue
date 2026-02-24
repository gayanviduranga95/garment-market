<template>
  <!-- 🔥 HERO BANNER (TOP, FULL WIDTH) -->
  <section class="relative h-[80vh] w-full">
    <img
      src="hhttps://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=1198&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Fashion banner"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <div class="relative z-10 h-full flex items-center">
      <div class="max-w-7xl mx-auto px-6">
        <h1 class="text-5xl md:text-6xl font-bold text-white mb-4">
          Vajira Clothing
        </h1>

        <p class="text-xl md:text-2xl text-gray-200 mb-8">
          Wear Confidence. Style Redefined.
        </p>

        <button
          class="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition"
          @click="scrollToProducts"
        >
          Shop Now
        </button>
      </div>
    </div>
  </section>

  <!-- 🔹 PAGE CONTENT -->
  <div class="max-w-7xl mx-auto px-6 py-8">

    <!-- CATEGORY FILTERS -->
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

    <!-- SEARCH -->
    <input
      v-model="searchText"
      type="text"
      placeholder="Search garments..."
      class="mb-6 w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
    />

    <!-- PRODUCTS -->
    <section id="products" class="mt-16">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">
        Latest Garments
      </h2>

      <div v-if="loading">Loading garments...</div>

      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
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
    </section>
  </div>

  <!-- MODAL -->
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
const scrollToProducts = () => {
  const section = document.getElementById('products')
  section?.scrollIntoView({ behavior: 'smooth' })
}

</script>
