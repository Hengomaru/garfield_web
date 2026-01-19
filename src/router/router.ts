import { createMemoryHistory, createRouter } from 'vue-router'
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import OrderList from '../views/OrderList.vue'
import OrderSubmit from '../views/OrderSubmit.vue'
import WarehouseList from '../views/WarehouseList.vue'
import WarehouseSubmit from '../views/WarehouseSubmit.vue'
import UserInfoList from '../views/UserInfoList.vue'
import UserInfoSubmit from '../views/UserInfoSubmit.vue'
import OrderDetails from '../views/OrderDetails.vue'

const routes = [
  { path: "/login", component: Login },
  { path: "/home", component: Home },
  { path: "/order/list", component: OrderList },
  { path: "/order/details", component: OrderDetails },
  { path: "/order/submit", component: OrderSubmit },
  { path: "/warehouse/list", component: WarehouseList },
  { path: "/warehouse/submit", component: WarehouseSubmit },
  { path: "/user/list", component: UserInfoList },
  { path: "/user/submit", component: UserInfoSubmit },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
