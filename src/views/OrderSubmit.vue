<script setup lang="ts">
import { reactive, ref } from 'vue'

// do not use same name with ref
const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})

const onSubmit = () => {
    console.log('submit!')
}

import type {
    TransferDirection,
    TransferKey,
    renderContent,
} from 'element-plus'

interface Option {
    key: number
    label: string
    disabled: boolean
}

const generateData = (): Option[] => {
    const data: Option[] = []
    for (let i = 1; i <= 15; i++) {
        data.push({
            key: i,
            label: `Option ${i}`,
            disabled: i % 4 === 0,
        })
    }
    return data
}

const data = ref(generateData())
const rightValue = ref([1])
const leftValue = ref([1])

const renderFunc: renderContent = (h, option) => h('span', null, option.label)

const handleChange = (
    value: TransferKey[],
    direction: TransferDirection,
    movedKeys: TransferKey[]
) => {
    console.log(value, direction, movedKeys)
}
</script>

<template>
    <div class="container">
        <el-form :model="form" style="max-width: 100%">
            <el-form-item label="Client name:">
                <el-input v-model="form.name" style="max-width: 30%" />
            </el-form-item>
            <el-form-item label="Owner name:">
                <el-input v-model="form.name" style="max-width: 30%" />
            </el-form-item>
            <el-form-item label="Owner type:">
                <el-select v-model="form.region" placeholder="please select owner type" style="max-width: 30%">
                    <el-option label="Individual" value="individual" />
                    <el-option label="Group" value="group" />
                </el-select>
            </el-form-item>
            <el-form-item label="Expiry time:">
                <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 12%" />
                <span class="text-gray-500" style="margin-left: 2%;margin-right: 2%;">--</span>
                <el-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 12%" />
            </el-form-item>

            <el-transfer v-model="leftValue" style="text-align: left; display: inline-block" filterable
                :left-default-checked="[2, 3]" :right-default-checked="[1]" :render-content="renderFunc"
                :titles="['Source', 'Target']" :button-texts="['To left', 'To right']" :format="{
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}',
                }" :data="data" @change="handleChange">
                <template #left-footer>
                    <el-button class="transfer-footer" size="small">Operation</el-button>
                </template>
                <template #right-footer>
                    <el-button class="transfer-footer" size="small">Operation</el-button>
                </template>
            </el-transfer>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">Create</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="less" scoped>
.container {
    margin-left: 25%;
    margin-top: 3%;
}
</style>