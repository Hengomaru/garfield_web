<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/store/orderStore'
import { ref, reactive } from 'vue'
import type { ComponentSize } from 'element-plus'
import { Order } from '@/interface/Order'
import router from '@/router/router'

const store = useOrderStore()

const { selectedRow, tableData } = storeToRefs(store)

const tableRowClassName = ({
    row,
    rowIndex,
}) => {
    row.index = rowIndex
}

const selectRow = (row: any) => {
    console.log('选中行数据：', row.index)
}

const data = reactive(selectedRow.value.product)

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

const goBack = () => {
    Object.assign(tableData.value[selectedRow.value.index], selectedRow.value)
    router.back();
};

const changeName = ref('');

const save = () => {
    if (changeName.value.trim() !== '') {
        selectedRow.value.client = changeName.value;
        console.log('Updated name to:', changeName.value);
        changeName.value = '';
    }
};
</script>

<template>
    <el-button type="primary" class="return-button" @click="goBack">返回</el-button>

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

    <div class="order-info-wrapper">
    <div class="order-info"><el-text class="mx-1 text-info">ID:</el-text><el-text class="mx-1">{{ selectedRow.id }}</el-text></div>
    <div class="order-info"><el-text class="mx-1 text-info" type="primary">Client:</el-text><el-text class="mx-1">{{ selectedRow.client }}</el-text></div>
    </div>

    <div class="order-info-wrapper">
    <div class="order-info"><el-text class="mx-1 text-info">Expired Date:</el-text><el-text class="mx-1">{{ selectedRow.expired_date }}</el-text></div>
    <div class="order-info"><el-text class="mx-1 text-info" type="primary">Created Date:</el-text><el-text class="mx-1">{{ selectedRow.created_date }}</el-text></div>
    </div>

    <div class="order-info-wrapper">
    <div class="order-info"><el-text class="mx-1 text-info">Status:</el-text><el-text class="mx-1">{{ selectedRow.status }}</el-text></div>
    <div class="order-info"><el-text class="mx-1 text-info" type="primary">Owner:</el-text><el-text class="mx-1">{{ selectedRow.owner }}</el-text></div>
    </div>

    <div class="order-info-wrapper">
    <div class="order-info"><el-text class="mx-1 text-info">Amount:</el-text><el-text class="mx-1">{{ selectedRow.amount }}</el-text></div>
    </div>

    <el-input v-model="changeName"></el-input>
    <el-button @click="save">修改名称</el-button>

    <div>
        <el-table :data="data" style="width: 100%" @row-click="selectRow" :row-class-name="tableRowClassName">
            <el-table-column prop="id" label="ID" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
        </el-table>
    </div>

    <div class="example-pagination-block">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[1, 2, 3, 4]"
            :size="size" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
            :total="5" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
</template>

<style lang="less" scoped>
.text-info {
    margin-right: 50px;
    font-weight: bold;
    color: #409EFF;
}
.order-info-wrapper {
    margin-bottom: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
}
.order-info {
    width: 25%;
    margin-bottom: 5px;
    margin-right: 250px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
}
.return-button {
    margin-bottom: 20px;
}
</style>