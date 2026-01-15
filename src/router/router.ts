import { createMemoryHistory, createRouter } from 'vue-router'
import Home from "../views/Home.vue"
import OrderList from '../views/OrderList.vue'
import OrderSubmit from '../views/OrderSubmit.vue'

const routes = [
  { path: '/order/list', component: OrderList },
  { path: '/order/submit', component: OrderSubmit },
  { path: '/home', component: Home },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
