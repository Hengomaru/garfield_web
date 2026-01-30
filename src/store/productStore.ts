import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useProductStore = defineStore('useProduct', () => {
  const productList = ref([])

  function setProductList(obj : any) {
    productList.value = JSON.parse(JSON.stringify(obj));
  }

  return { productList, setProductList }
})

