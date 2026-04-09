import { defineStore } from 'pinia'
import type { Product } from '../types/Product'


export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as Product[]
  }),

  getters: {
    count: (state) => state.items.length,
    total: (state) =>
      state.items.reduce((sum, item) => sum + item.price, 0)
  },

  actions: {
    addToCart(product: Product) {
      this.items.push(product)
    },

    removeFromCart(id: number) {
      this.items = this.items.filter(item => item.id !== id)
    },

    clearCart() {
      this.items = []
    }
  }
})