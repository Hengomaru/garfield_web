<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import router from '@/router/router'
import { computed } from "vue";
import { useMenuStore } from '@/store/menuStore'

const store = useMenuStore()
const { getCurrentMenu } = store

const source = computed(() => {
    return getCurrentMenu()
})

function click(item: any) {
  console.log(item)
  router.push(item.path)
}
</script>

<template>
      <el-menu>  
        <template v-for="{label, path} in source" >
          <el-menu-item :index="path" @click="click({label, path})">
          <el-icon><document /></el-icon>
          <span>{{ label }}</span>
        </el-menu-item>
        </template>
      </el-menu>
</template>



