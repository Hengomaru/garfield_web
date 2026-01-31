import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderStore = defineStore('useOrder', () => {
  const selectedRow = ref(0)

  const tableData = ref([])

  function setTableData(obj : any) {
    tableData.value = JSON.parse(JSON.stringify(obj));
  }

  return { selectedRow, tableData, setTableData }
})

