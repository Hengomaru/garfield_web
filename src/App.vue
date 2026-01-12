<script setup lang="ts">
  import HeaderMenu from "./components/HeaderMenu.vue"
  import HeaderLogin from "./components/HeaderLogin.vue"
  import AsideMenu from "./components/AsideMenu.vue"
  import AsideLogin from "./components/AsideLogin.vue"
  import Entrance from "./views/Entrance.vue"
  import Login from "./views/Login.vue";
  import { ref } from "vue";

  const currentHeader = ref(HeaderLogin)
  const currentAside = ref(AsideLogin)
  const currentMain = ref(Login)
</script>

<template>
  <div class="common-layout">
    <button @click="currentHeader = HeaderMenu; currentAside = AsideMenu; currentMain = Entrance">Toggle Menu</button>
    <button @click="currentHeader = HeaderLogin; currentAside = AsideLogin; currentMain = Login">Toggle Login</button>

    <el-container>
      <el-header>
          <component :is="currentHeader" />
      </el-header>

      <el-container style="min-height: 90dvh;">
        <el-aside>
          <component :is="currentAside" />
        </el-aside>
        <el-main>
          <component :is="currentMain" />
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