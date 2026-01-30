import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderStore = defineStore('useOrder', () => {
  const selectedRow = ref(0)

  const tableData = ref([])
  //   {
  //   index: 0,
  //   id: 1,
  //   owner: 'aa',
  //   ownerType: 'individual',
  //   client: 'bb',
  //   product: [{id: 1, name:"a"}, {id: 2, name:"d"}],
  //   createdTime: '2012-10-02 14:10:00',
  //   expiredTime: '2022-10-02 14:10:00',
  //   status: 'NEW',
  //   amount: 1110,
  //   deleted: false
  // }

  function setTableData(obj : any) {
    tableData.value = JSON.parse(JSON.stringify(obj));
  }

  return { selectedRow, tableData, setTableData }
})

