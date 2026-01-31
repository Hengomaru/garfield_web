<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/store/orderStore'
import { ref, onMounted } from 'vue'
import type { ComponentSize, TableInstance } from 'element-plus'
import { Order } from '@/interface/Order'
import router from '@/router/router'
import { axiosService } from '@/utils/axiosService';
import { useProductStore } from '@/store/productStore'

const productStore = useProductStore()
const { setProductList } = productStore
const { productList } = storeToRefs(productStore)
const store = useOrderStore()
const { selectedRow, tableData } = storeToRefs(store)
const { setTableData } = store

const fetchOrders = () => {
    axiosService.get('/order/list').then((response) => {
        setTableData(response["content"])
    }).catch((error) => {
        console.error('order失败:', error);
    });
}

const fetchProducts = () => {
    axiosService.get('/product/list').then((response) => {
        setProductList(response["content"])
    }).catch((error) => {
        console.error('product 失败:', error);
    });
}

onMounted(() => {
    if (tableData.value.length === 0) {
        fetchOrders()
    }

    if (productList.value.length === 0) {
        fetchProducts()
    }
});

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
    const i = (currentPage.value - 1) * pageSize.value + row.index
    selectedRow.value = i
    router.push("/order/details");
}

const currentPage = ref(1)

const pageSize = ref(10)

const size = ref<ComponentSize>('large')

const background = ref(true)

const handleSizeChange = (val: number) => {
    pageSize.value = val
}

const handleCurrentChange = (val: number) => {
    currentPage.value = val
}

const selectable = (row: Order) => ![1, 2].includes(row.id)

const multipleTableRef = ref<TableInstance>()
const multipleSelection = ref<Order[]>([])

const toggleSelection = (rows?: Order[], ignoreSelectable?: boolean) => {
    if (rows) {
        rows.forEach((row) => {
            multipleTableRef.value!.toggleRowSelection(
                row,
                undefined,
                ignoreSelectable
            )
        })
    } else {
        multipleTableRef.value!.clearSelection()
    }
}

const handleSelectionChange = (val: Order[]) => {
    multipleSelection.value = val
}

const deleteOrder = () => {
    if (multipleSelection !== null && multipleSelection.value.length > 0) {
        const list = []
        for(const order of multipleSelection.value){
            list.push(order.id)
        }

        axiosService.post('/order/delete', {'list': list}).then((response) => {
            fetchOrders()
        }).catch((error) => {
            console.error('product 失败:', error);
        });
    }
}

const refresh = () => {
    fetchOrders()
}
</script>

<template>
    <div class="flex items-center mb-4">
        <el-radio-group v-model="size" class="mr-4">
            <el-radio-button value="default">default</el-radio-button>
            <el-radio-button value="large">large</el-radio-button>
            <el-radio-button value="small">small</el-radio-button>
        </el-radio-group>
    </div>

    <hr class="my-4" />

    <div>
        <el-button type="primary" class="return-button" @click="deleteOrder">删除</el-button>
        <el-button type="primary" class="return-button" @click="refresh">刷新</el-button>
    </div>

    <div>
        <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%"
            :row-class-name="tableRowClassName" @row-click="selectRow" row-key="id" ref="multipleTableRef"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" :selectable="selectable" width="55" />
            <el-table-column prop="id" label="ID" width="80" />
            <el-table-column prop="client" label="Client" width="180" />
            <el-table-column prop="owner" label="Owner" width="180" />
            <el-table-column prop="ownerType" label="Owner Type" width="180" />
            <el-table-column prop="createdTime" label="Created Date" width="200" />
            <el-table-column prop="expiredTime" label="Expired Date" width="200" />
            <el-table-column prop="status" label="Status" width="150" />
            <el-table-column prop="amount" label="Amount" width="150" />
        </el-table>
    </div>

    <div class="example-pagination-block">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
            :size="size" :background="background" layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
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
