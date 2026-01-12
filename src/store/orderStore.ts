import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('useCounter', () => {
  const count = ref(0)
  const name = ref('Eduardo')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  function reset() {
    count.value = 0
  }

  return { count, name, doubleCount, increment, reset }
})

