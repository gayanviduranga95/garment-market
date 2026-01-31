export interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
  category: string
}
import { ref, onMounted, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import type { Product } from '../types/Product'

const products = ref<Product[]>([])
const loading = ref(true)
const searchText = ref('')

const filteredProducts = computed(() => {
  return products.value.filter(product =>
    product.title.toLowerCase().includes(searchText.value.toLowerCase())
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
