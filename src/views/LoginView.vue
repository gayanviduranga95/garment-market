<template>
    <div class="main-h-screen flex items-center justify-center px-4 pt-24 bg-gradient-to-r from purple-200 via-pink-100 to blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div
        class="w-full max-w-md p-8 rounded-2xl
        bg-white/60 dark:bg-gray-800/60
        backdrop-blur-lg shadow-xl"
        >
        <h2 class="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Login
        </h2>
        <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full mb-4 px-4 py-3 rounded-lg
        bg-white dark:bg-gray-700
        text-gray-800 dark:text-white
        border border-gray-300 dark:border-gray-600
        focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full mb-6 px-4 py-3 rounded-lg
        bg-white dark:bg-gray-700
        text-gray-800 dark:text-white
        border border-gray-300 dark:border-gray-600
        focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        @click="login"
        class="w-full bg-purple-600 hover:bg-purple-700
        text-white py-3 rounded-lg font-semibold transition"
      >
        Login
      </button>
       <p v-if="error" class="text-red-500 mt-4 text-center">
        {{ error }}
      </p>

      <!-- Footer -->
      <p class="text-center text-gray-600 dark:text-gray-400 mt-6">
        Don't have an account?
        <span class="text-purple-600 cursor-pointer">Register</span>
      </p>

        </div>  

    </div>
</template>    
<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const error = ref('')

function login() {

  if (!email.value || !password.value) {
    error.value = 'Please fill all fields'
    return
  }

  if (email.value === 'gayanviduranga95@gmail.com' && password.value === '1234') {
    alert('Login successful 🎉')
    error.value = ''
  } else {
    error.value = 'Invalid email or password'
  }

}
</script>