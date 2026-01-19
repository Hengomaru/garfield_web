import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import type { Order } from '../interface/Order'

export const useOrderStore = defineStore('useOrder', () => {
  const selectedRow = reactive({
        index: 0,
        owner: 'Garfield',
        id: 1,
        created_date: '2016-05-03',
        client: 'Tom',
        expired_date: '2026-05-03',
        status: 'Sending',
        amount: 15000.00,
        product: [{id:1, name:'Product A'}, {id:2, name:'Product B'}],
    })

  const tableData = reactive([
    {
        index: 0,
        owner: 'Garfield',
        id: 1,
        created_date: '2016-05-03',
        client: 'Tom',
        expired_date: '2026-05-03',
        status: 'Sending',
        amount: 15000.00,
        product: [{id:1, name:'Product A'}, {id:2, name:'Product B'}],
    },
    {
        index: 1,
        owner: 'Lucy',
        id: 2,
        created_date: '2016-05-03',
        client: 'Jack',
        expired_date: '2026-05-03',
        status: 'Delayed',
        amount: 3000.00,
        product: [{id:7, name:'Product G'}, {id:8, name:'Product H'}],
    },
    {
        index: 2,
        owner: 'Danny',
        id: 3,
        created_date: '2016-05-03',
        client: 'Tom',
        expired_date: '2026-05-03',
        status: 'Paid',
        amount: 1032.00,
        product: [{id:3, name:'Product E'}, {id:4, name:'Product F'}],
    },
    {
        index: 3,
        owner: 'Garfield',
        id: 4,
        created_date: '2016-05-03',
        client: 'William',
        expired_date: '2026-05-03',
        status: 'Cancelled',
        amount: 25000.00,
        product: [{id:5, name:'Product C'}, {id:6, name:'Product D'}],
    },
])

  return { selectedRow, tableData }
})

