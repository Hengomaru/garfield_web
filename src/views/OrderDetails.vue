<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/store/orderStore'
import { useProductStore } from '@/store/productStore'
import { ref, reactive, onMounted, onBeforeMount } from 'vue'
import type { ComponentSize } from 'element-plus'
import { Order } from '@/interface/Order'
import router from '@/router/router'
import { axiosService } from '@/utils/axiosService'

const store = useOrderStore()
const productStore = useProductStore()
const { productList } = storeToRefs(productStore)
const { selectedRow, tableData } = storeToRefs(store)
const { setTableData } = store

const getRow = () : Order => {
    const value = tableData.value[selectedRow.value]
    const info = reactive({
        index: value.index,
        id: value.id,
        owner: value.owner,
        ownerType: value.ownerType,
        client: value.client,
        product: value.product,
        createdTime: value.createdTime,
        expiredTime: value.expiredTime,
        status: value.status,
        amount: value.amount,
        deleted: value.deleted
    })
    return info;
}

const data : Order = getRow()

const getProducts = (arr) => {
    if(!arr){return null}
    const result = []
    for(const e of arr){
        for(const p of productList.value){
            if(e.id == p.id){
               result.push({
                id: p.id,
                name: p.name,
                children: p.material
               }) 
            }
        }
    }
    return result
}

const products = getProducts(data.product)

const tableRowClassName = ({
    row,
    rowIndex,
}) => {
    row.index = rowIndex
}

const selectRow = (row: any) => {
    console.log('选中行数据：', row.index)
}

const currentPage = ref(1)

const pageSize = ref(10)

const size = ref<ComponentSize>('large')

const background = ref(true)

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}

const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}

const goBack = () => {
    router.back();
};

const temp_calendar = reactive({
    date: '',
    time: ''
})

const isAmountEdit = ref(false)
const isClientEdit = ref(false)
const isStatusEdit = ref(false)
const isOwnerTypeEdit = ref(false)
const isOwnerEdit = ref(false)
const isExpiryEdit = ref(false)

const edit = (type) => {
    let field;
    switch (type) {
        case 1: field = isClientEdit; break
        case 2: field = isOwnerTypeEdit; break
        case 3: field = isStatusEdit; break
        case 4: field = isOwnerEdit; break
        case 5: field = isAmountEdit; break
        case 6: field = isExpiryEdit; break
        default: break
    }
    if (field.value === false) {
        field.value = true
    } else {
        if (type === 6) {
            data.expiredTime = temp_calendar.date + ' ' + temp_calendar.time
        }
        field.value = false
    }
};

const submit = () => {
    axiosService.post('/order/update', data).then((response) => {
        console.log(response["content"])
        tableData.value[selectedRow.value] = response["content"]
    }).catch((error) => {
        console.error('order失败:', error);
    });
}
</script>

<template>
    <el-button type="primary" class="return-button" @click="goBack">返回</el-button>
    <el-button type="primary" class="return-button" @click="submit">修改</el-button>

    <hr class="my-4" />
    <div class="order-info-wrapper">
        <div class="order-info"><el-text class="mx-1 text-info">ID:</el-text>
            <el-text class="mx-1">{{ data.id }}</el-text>
            <div>&nbsp;</div>
        </div>
        <div class="order-info"><el-text class="mx-1 text-info" type="primary">Client:</el-text>
            <el-text class="mx-1" v-show="!isClientEdit">{{ data.client }}</el-text>
            <el-input v-model="data.client" v-show="isClientEdit" style="max-width: 40%" type="text"></el-input>
            <el-button @click="edit(1)">{{ isClientEdit ? 'save' : 'edit' }}</el-button>
        </div>
    </div>

    <div class="order-info-wrapper">
        <div class="order-info"><el-text class="mx-1 text-info">Owner type:</el-text>
            <el-text class="mx-1" v-show="!isOwnerTypeEdit">{{ data.ownerType }}</el-text>
            <el-select v-model="data.ownerType" placeholder="please select owner type" v-show="isOwnerTypeEdit"
                style="max-width: 30%">
                <el-option label="Individual" value="individual" />
                <el-option label="Group" value="group" />
            </el-select>
            <el-button @click="edit(2)">{{ isOwnerTypeEdit ? 'save' : 'edit' }}</el-button>
        </div>
        <div class="order-info"><el-text class="mx-1 text-info" type="primary">Created Date:</el-text>
            <el-text class="mx-1">{{ data.createdTime }}</el-text>
            <div>&nbsp;</div>
        </div>
    </div>

    <div class="order-info-wrapper">
        <div class="order-info"><el-text class="mx-1 text-info">Status:</el-text>
            <el-text class="mx-1" v-show="!isStatusEdit">{{ data.status }}</el-text>
            <el-input v-model="data.status" v-show="isStatusEdit" style="max-width: 40%" type="text"></el-input>
            <el-button @click="edit(3)">{{ isStatusEdit ? 'save' : 'edit' }}</el-button>
        </div>
        <div class="order-info"><el-text class="mx-1 text-info" type="primary">Owner:</el-text>
            <el-text class="mx-1" v-show="!isOwnerEdit">{{ data.owner }}</el-text>
            <el-input v-model="data.owner" v-show="isOwnerEdit" style="max-width: 40%" type="text"></el-input>
            <el-button @click="edit(4)">{{ isOwnerEdit ? 'save' : 'edit' }}</el-button>
        </div>
    </div>

    <div class="order-info-wrapper">
        <div class="order-info"><el-text class="mx-1 text-info">Amount:</el-text>
            <el-text class="mx-1" v-show="!isAmountEdit">{{ data.amount }}</el-text>
            <el-input v-model="data.amount" v-show="isAmountEdit" style="max-width: 40%" type="text"></el-input>
            <el-button @click="edit(5)">{{ isAmountEdit ? 'save' : 'edit' }}</el-button>
        </div>

        <div class="order-info"><el-text class="mx-1 text-info">Expired Date:</el-text>
            <el-text class="mx-1" v-show="!isExpiryEdit">{{ data.expiredTime }}</el-text>
            <div v-show="isExpiryEdit" style="max-width: 60%">
                <el-date-picker v-model="temp_calendar.date" type="date" placeholder="Pick a date" style="width: 40%"
                    format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
                <span class="text-gray-500" style="margin-left: 2%;margin-right: 2%;">--</span>
                <el-time-picker v-model="temp_calendar.time" placeholder="Pick a time" style="width: 40%"
                    format="HH:mm:ss" value-format="HH:mm:ss" />
            </div>
            <el-button @click="edit(6)">{{ isExpiryEdit ? 'save' : 'edit' }}</el-button>
        </div>
    </div>

    <div>
        <el-table :data="products" style="width: 100%; margin-top: 3dvh;" @row-click="selectRow"
            :row-class-name="tableRowClassName" border row-key="id">
            <el-table-column prop="id" label="ID" width="180" sortable/>
            <el-table-column prop="name" label="Name" width="180" sortable/>
        </el-table>
    </div>

    <div class="example-pagination-block" style="margin-top: 3dvh">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[1, 2, 3, 4]"
            :size="size" :background="background" layout="total, sizes, prev, pager, next, jumper" :total="5"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
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
    justify-content: center;
    align-items: center;
    flex-direction: row;
}

.order-info {
    width: 35%;
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