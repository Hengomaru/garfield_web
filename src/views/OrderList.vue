<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/store/orderStore'
import { ref, computed } from 'vue'
import type { ComponentSize } from 'element-plus'
import { Order } from '@/interface/Order'
import router from '@/router/router'

const store = useOrderStore()

const { selectedRow, tableData } = storeToRefs(store)

const tableRowClassName = ({
    row,
    rowIndex,
}: {
    row: Order
    rowIndex: number
}) => {
    row.index = rowIndex
}

const selectRow = (row: Order) => {
    Object.assign(selectedRow.value, tableData.value[row.index])
    router.push("/order/details");
}

const currentPage = ref(1)

const pageSize = ref(10)

const size = ref<ComponentSize>('large')

const background = ref(true)

const disabled = ref(false)

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}

const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}

const show = () => {
    console.log('Selected client name:', selectedRow.value.client);
    console.log('row client name:', tableData.value[selectedRow.value.index].client);
};
</script>

<template>
    <div class="flex items-center mb-4">
    <el-radio-group v-model="size" class="mr-4">
      <el-radio-button value="default">default</el-radio-button>
      <el-radio-button value="large">large</el-radio-button>
      <el-radio-button value="small">small</el-radio-button>
    </el-radio-group>
    <div>
      Background: <el-switch v-model="background" class="ml-2" />
    </div>
    <div class="ml-4">
      Disabled: <el-switch v-model="disabled" class="ml-2" />
    </div>
  </div>

  <hr class="my-4" />
  <el-button @click="show">client名称</el-button>

    <div class="example-pagination-block">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
            :page-sizes="[5, 10, 15, 20]" :size="size" :disabled="disabled" :background="background"
            layout="total, sizes, prev, pager, next, jumper" :total="50" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>

    <div>
        <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName" @row-click="selectRow">
            <el-table-column prop="id" label="ID" width="80" />
            <el-table-column prop="client" label="Client" width="180" />
            <el-table-column prop="owner" label="Owner" width="180" />
            <el-table-column prop="created_date" label="Created Date" width="180" />
            <el-table-column prop="expired_date" label="Expired Date" width="180" />
            <el-table-column prop="status" label="Status" width="150" />
            <el-table-column prop="amount" label="Amount" width="150" />
        </el-table>
    </div>

    <div class="example-pagination-block">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
            :page-sizes="[5, 10, 15, 20]" :size="size" :disabled="disabled" :background="background"
            layout="total, sizes, prev, pager, next, jumper" :total="50" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>

<style lang="less" scoped>
:deep(.el-table .warning-row) {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

:deep(.el-table .success-row) {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.example-pagination-block {
    margin: 50px;
}
</style>
