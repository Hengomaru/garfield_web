import { createMemoryHistory, createRouter } from 'vue-router'

import OrderList from '../views/OrderList.vue'
import OrderSubmit from '../views/OrderSubmit.vue'

const routes = [
  { path: '/order/list', component: OrderList },
  { path: '/order/submit', component: OrderSubmit },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
