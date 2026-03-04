<template>
<nav class="sticky top-0 z-50 flex justify-center mt-3">

  <div
    class="w-full max-w-7xl flex justify-between items-center
    px-6 py-3 rounded-xl
    bg-gradient-to-r from-purple-300 via-pink-200 to-blue-300
    dark:from-purple-800 dark:via-pink-700 dark:to-blue-800
    backdrop-blur-md shadow-md
    text-gray-800 dark:text-white"
  >

    <h1 class="text-lg font-semibold tracking-wide">
      VAJIRA CLOTHING
    </h1>

    <div class="flex items-center gap-6 font-medium">

      <router-link
        to="/"
        class="flex items-center gap-1 hover:text-purple-700 dark:hover:text-purple-300 transition"
      >
        <Home :size="18" />
        Home
      </router-link>

      <router-link
        to="/about"
        class="hover:text-purple-700 dark:hover:text-purple-300 transition"
      >
        About
      </router-link>

      <router-link
        to="/cart"
        class="flex items-center gap-2
        bg-white/40 dark:bg-gray-800/60
        px-3 py-1 rounded-lg
        hover:bg-white/60 dark:hover:bg-gray-700 transition"
      >
        <ShoppingCart :size="18" />

        <span class="font-semibold">
          {{ cart.count }}
        </span>
      </router-link>

      <button
        @click="toggleDark"
        class="flex items-center justify-center
        bg-white/40 dark:bg-gray-800/60
        p-2 rounded-lg
        hover:bg-white/60 dark:hover:bg-gray-700
        transition"
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