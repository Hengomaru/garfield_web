import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuStore = defineStore('useMenu', () => {
  const map = new Map()
  map.set("home", [{label: "Home", path: "/home"}])
  map.set("user", [{label: "User Information", path: "/user/list"}, {label: "Modify User Information", path: "/user/submit"}])
  map.set("order", [{label: "Order List", path: "/order/list"}, {label: "Submit Order", path: "/order/submit"}])
  map.set("warehouse", [{label: "Warehouse List", path: "/warehouse/list"}, {label: "Manage Warehouse", path: "/warehouse/submit"}])
  map.set("file", [{label: "File Upload", path: "/file/upload"}, {label: "File Download", path: "/file/download"}])

  const currentMenu = ref('home')

  function setCurrentMenu(name : string) {
    currentMenu.value = name
  }

  function getCurrentMenu() {
    return map.get(currentMenu.value)
  }

  return { currentMenu, setCurrentMenu, getCurrentMenu }
})