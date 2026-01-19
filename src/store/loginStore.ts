import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore('useLogin', () => {
  const isLogin = ref(true)
  const username = ref('Anonymous')
  function setLogin(flag: boolean) {
    isLogin.value = flag
  }
  function setUser(name: string) {
    username.value = name
  }
  
  return { isLogin, username, setLogin, setUser }
})