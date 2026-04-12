<template>

<section class="max-w-7xl mx-auto mt-6 px-6">

  <div class="bg-gradient-to-r from-purple-300 via-pink-200 to-blue-300
  p-6 rounded-3xl
  dark:from-purple-800 dark:via-pink-700 dark:to-blue-800">

    <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md
    grid md:grid-cols-2 p-10 rounded-2xl shadow-lg">

      <div>

        <h1 class="text-4xl font-bold text-purple-700 mb-4 dark:text-white">
          Welcome to Vajira Clothing
        </h1>

        <p class="text-gray-600 dark:text-gray-300 mb-6">
          Discover quality garments for everyday confidence.
          Shop our latest collection of stylish and comfortable clothing.
        </p>

        <button
          class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg">
          Shop Now
        </button>

      </div>

      <img
        :src="heroImg"
        class="rounded-xl shadow-md"
      />

    </div>

  </div>

</section>


<div class="max-w-7xl mx-auto px-6 py-10">
  <div class="flex flex-wrap gap-3 mb-6">

    <button
      @click="selectedCategory = 'all'"
      :class="buttonClass('all')"
      class="px-4 py-2 rounded-full transition
      dark:bg-gray-700 dark:text-white"
    >
      All
    </button>

    <button
      @click="selectedCategory = 'mens-shirts'"
      :class="buttonClass('mens-shirts')"
      class="px-4 py-2 rounded-full transition
      dark:bg-gray-700 dark:text-white"
    >
      Men
    </button>

    <button
      @click="selectedCategory = 'womens-dresses'"
      :class="buttonClass('womens-dresses')"
      class="px-4 py-2 rounded-full transition
      dark:bg-gray-700 dark:text-white"
    >
      Women
    </button>

    <button
      @click="selectedCategory = 'mens-shoes'"
      :class="buttonClass('mens-shoes')"
      class="px-4 py-2 rounded-full transition
      dark:bg-gray-700 dark:text-white"
    >
      Shoes
    </button>

    <button
      @click="selectedCategory = 'tops'"
      :class="buttonClass('tops')"
      class="px-4 py-2 rounded-full transition
      dark:bg-gray-700 dark:text-white"
    >
      Tops
    </button>

  </div>

  <input
    v-model="searchText"
    type="text"
    placeholder="Search garments..."
    class="mb-10 w-full max-w-md px-4 py-3 border rounded-xl
    focus:outline-none focus:ring-2 focus:ring-purple-400
    bg-white dark:bg-gray-800
    text-gray-700 dark:text-gray-200
    border-gray-300 dark:border-gray-600"
  />


  <section id="products">

    <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-8">
      Latest Garments
    </h2>

    <div v-if="loading" class="dark:text-gray-300">
      Loading garments...
    </div>

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
      class="text-gray-500 dark:text-gray-400 mt-6"
    >
      No garments found.
    </p>

  </section>

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
import heroImg from '../assets/img.webp'
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


const buttonClass = (category: string) => {

  return selectedCategory.value === category
    ? 'bg-purple-600 text-white shadow'
    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border hover:bg-purple-500 hover:text-white'

}

</script>