<script setup lang="ts">
  import { useLoginStore } from '@/store/loginStore'
  import axiosService from '@/utils/axiosService';

  const store = useLoginStore()
  const { username } = store

  const loginTime = new Date().toLocaleString();

  const orderQuery = () => {
    console.log("orderQuery invoked")
    axiosService.get("/order/query").then((response) => {
      console.log("orderQuery 成功", response["content"])
    }).catch((error) => {
      console.error("orderQuery 失败", error + " " + error.response.status)
    })
  }
</script>

<template>
  <h1>Welcome, {{ username }}</h1>
  <h1>登录时间, {{ loginTime }}</h1>
  <el-button type="default" class="reset-verification" @click="orderQuery">生成验证码</el-button>
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