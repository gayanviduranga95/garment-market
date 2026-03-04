<template>

<nav class="sticky top-0 z-50 flex justify-center mt-3">

  <div
    class="w-full max-w-7xl flex justify-between items-center
    px-6 py-3 rounded-xl
    bg-gradient-to-r from-purple-300 via-pink-200 to-blue-300
    backdrop-blur-md shadow-md"
  >

    <!-- LOGO -->
    <h1 class="text-lg font-semibold text-gray-800 tracking-wide">
      VAJIRA CLOTHING
    </h1>


    <!-- MENU -->
    <div class="flex items-center gap-6 text-gray-700 font-medium">


      <!-- HOME -->
      <router-link
        to="/"
        class="flex items-center gap-1 hover:text-purple-700 transition"
      >
        <Home :size="18" />
        Home
      </router-link>


      <!-- ABOUT -->
      <router-link
        to="/about"
        class="hover:text-purple-700 transition"
      >
        About
      </router-link>


      <!-- CART -->
      <router-link
        to="/cart"
        class="flex items-center gap-2 bg-white/40 px-3 py-1 rounded-lg hover:bg-white/60 transition"
      >
        <ShoppingCart :size="18" />
        <span class="font-semibold">
          {{ cart.count }}
        </span>
      </router-link>


      <!-- DARK MODE BUTTON -->
      <button
  @click="toggleDark"
  class="flex items-center justify-center bg-white/40 p-2 rounded-lg hover:bg-white/60 transition"
>

  <Moon v-if="!dark" :size="18" />
  <Sun v-else :size="18" />

</button>


    </div>

  </div>

</nav>

</template>



<script setup lang="ts">
  import { useCartStore } from '../stores/cart'
import { ShoppingCart, Home, Moon, Sun } from 'lucide-vue-next'
import { ref } from 'vue'

const cart = useCartStore()

const dark = ref(false)

function toggleDark() {
  dark.value = !dark.value

  if (dark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>