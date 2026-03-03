<template>


  <div class="min-h-screen bg-purple-50">

    <div class="max-w-7xl mx-auto px-6 py-10">


      <div class="mb-10">
        <h1 class="text-4xl font-bold text-purple-800">
          Vajira Clothing
        </h1>
        <p class="text-gray-1000 mt-3">
          Quality garments for everyday confidence.
        </p>
      </div>

 
      <div class="flex flex-wrap gap-3 mb-6">
        <button
          @click="selectedCategory = 'all'"
          :class="buttonClass('all')"
          class="px-4 py-2 rounded-full transition"
        >
          All
        </button>

        <button
          @click="selectedCategory = 'mens-shirts'"
          :class="buttonClass('mens-shirts')"
          class="px-4 py-2 rounded-full transition"
        >
          Men
        </button>

        <button
          @click="selectedCategory = 'womens-dresses'"
          :class="buttonClass('womens-dresses')"
          class="px-4 py-2 rounded-full transition"
        >
          Women
        </button>

        <button
          @click="selectedCategory = 'mens-shoes'"
          :class="buttonClass('mens-shoes')"
          class="px-4 py-2 rounded-full transition"
        >
          Shoes
        </button>

        <button
          @click="selectedCategory = 'tops'"
          :class="buttonClass('tops')"
          class="px-4 py-2 rounded-full transition"
        >
          Tops
        </button>
      </div>

     
      <input
        v-model="searchText"
        type="text"
        placeholder="Search garments..."
        class="mb-10 w-full max-w-md px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-700"
      />

   
      <section id="products">
        <h2 class="text-2xl font-semibold text-gray-800 mb-8">
          Latest Garments
        </h2>

        <div v-if="loading" class="text-red-500">
  Loading garments... ({{ products.length }})
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
          class="text-gray-500 mt-6"
        >
          No garments found.
        </p>
      </section>

    </div>
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

const buttonClass = (category: string) => {
  return selectedCategory.value === category
    ? 'bg-purple-600 text-white shadow'
    : 'bg-white text-gray-700 border hover:bg-purple-500 hover:text-white'
}

</script>
