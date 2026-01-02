<script setup lang="ts">

</script>

<template>
    <el-menu ellipsis class="el-menu-popper-demo" mode="horizontal">
            <el-menu-item index="1">Processing Center</el-menu-item>
            <el-sub-menu index="2">
                <template #title>Workspace</template>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
                <el-sub-menu index="2-4">
                    <template #title>item four</template>
                    <el-menu-item index="2-4-1">item one</el-menu-item>
                    <el-menu-item index="2-4-2">item two</el-menu-item>
                    <el-menu-item index="2-4-3">item three</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-sub-menu index="3">
                <template #title>Override Popper Offset</template>
                <el-menu-item index="3-1">item one</el-menu-item>
                <el-menu-item index="3-2">item two</el-menu-item>
                <el-menu-item index="3-3">item three</el-menu-item>
                <el-sub-menu index="3-4">
                    <template #title>override child</template>
                    <el-menu-item index="3-4-1">item one</el-menu-item>
                    <el-menu-item index="3-4-2">item two</el-menu-item>
                    <el-menu-item index="3-4-3">item three</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="4">Info</el-menu-item>
            <el-menu-item index="5">Orders</el-menu-item>
            <el-menu-item index="6">Logout</el-menu-item>
        </el-menu>
</template>

<style scoped>

</style>