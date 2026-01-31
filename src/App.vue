<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />
    <div class="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <ProductCard
        title="Men Casual Shirt"
        :price="2500"
        image="https://images.unsplash.com/photo-1520975916090-3105956dac38"
      />
      <ProductCard
        title="Ladies Cotton Dress"
        :price="1800"
        image="https://images.unsplash.com/photo-1651047566242-1f93897b907a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import ProductCard from './components/ProductCard.vue'
</script>
