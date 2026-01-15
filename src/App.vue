<script setup lang="ts">
  import HeaderMenu from "./components/HeaderMenu.vue"
  import HeaderLogin from "./components/HeaderLogin.vue"
  import AsideMenu from "./components/AsideMenu.vue"
  import AsideLogin from "./components/AsideLogin.vue"
  import { computed } from "vue";
  import { useLoginStore } from '@/store/loginStore'
  import { storeToRefs } from 'pinia'
  import router from "@/router/router"

  const store = useLoginStore()
  const { isLogin } = storeToRefs(store)
  
  if(!isLogin.value){
    router.push("/login")
  }else{
    router.push("/home")
  }

  const currentHeader = computed(() => {
    return isLogin.value ? HeaderMenu : HeaderLogin
  })
  const currentAside = computed(() => {
    return isLogin.value ? AsideMenu : AsideLogin
  })
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
          <component :is="currentHeader" />
      </el-header>

      <el-container style="min-height: 90dvh;">
        <el-aside>
          <component :is="currentAside" />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
  @border-style: 1px solid rgb(0, 217, 255);
  
  .el-aside {
    border: @border-style;
    margin: 2px;
  }

  .el-footer {
    border: 1px solid rgb(255, 0, 13);
  }

  .el-header {
    border: 1px solid rgb(0, 255, 94);
  }

  .el-main {
    border: 1px solid blue;
  }
</style>