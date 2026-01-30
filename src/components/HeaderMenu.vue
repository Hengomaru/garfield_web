<script setup lang="ts">
import { useMenuStore } from '@/store/menuStore'
const store = useMenuStore()
const { setCurrentMenu } = store
</script>

<template>
    <el-menu ellipsis class="el-menu-popper-demo" mode="horizontal">
        <el-menu-item index="1" @click="setCurrentMenu('home')">Home</el-menu-item>
        <el-menu-item index="2" @click="setCurrentMenu('warehouse')">Warehouse</el-menu-item>
        <el-menu-item index="3" @click="setCurrentMenu('order')">Orders</el-menu-item>
        <el-menu-item index="4" @click="setCurrentMenu('user')">User</el-menu-item>
        <el-menu-item index="5" @click="setCurrentMenu('file')">File</el-menu-item>
        <el-menu-item index="6" @click="setCurrentMenu('data')">Data</el-menu-item>
    </el-menu>
</template>

<style scoped></style>