import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore('useLogin', () => {
  const isLogin = ref(false)
  const username = ref('')
  function setLogin(flag : boolean) {
    isLogin.value = flag
  }
  function setUser(name : string) {
    username.value = name
  }

  return { isLogin, username, setLogin, setUser }
})