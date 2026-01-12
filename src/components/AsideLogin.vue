<template>
      <el-menu>  
        <el-menu-item index="1">
          <el-icon><icon-menu /></el-icon>
          <span>Forget password</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><document /></el-icon>
          <span>Register account</span>
        </el-menu-item>
      </el-menu>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
</script>

