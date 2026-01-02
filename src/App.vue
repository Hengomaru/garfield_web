<script setup lang="ts">
  import HeaderMenu from "./components/HeaderMenu.vue"
  import AsideMenu from "./components/AsideMenu.vue"
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HeaderMenu></HeaderMenu>
      </el-header>
      <el-container>
        <el-aside>
          <AsideMenu></AsideMenu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
  @border-style: 1px solid rgb(0, 217, 255);
  
  .el-aside {
    border: @border-style;
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