<script setup lang="ts">
import { reactive, ref } from 'vue'
import type {
    FormInstance,
    FormRules,
    TransferDirection,
    TransferKey,
    renderContent,
} from 'element-plus'
import axiosService from '@/utils/axiosService'
import { useProductStore } from '@/store/productStore'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()
const { setProductList } = productStore
const { productList } = storeToRefs(productStore)

const data = ref<Option[]>([])

async function generateData() {
    if(productList.value === null || productList.value.length === 0){
        await axiosService.get('/product/list').then((response) => {
        setProductList(response["content"])
    }).catch((error) => {
        console.error('product 失败:', error)
    })
    }
    for(const p of productList.value){
        data.value.push(
            {
                key: p.id,
                label: p.name,
                disabled: false
            }
        )
    }
    return data
}
generateData()

interface Option {
    key: number
    label: string
    disabled: boolean
}

const rightValue = ref([])
const leftValue = ref([])

const ruleFormRef = ref<FormInstance>();

interface RuleForm {
    client: string
    owner: string
    ownerType: string
    date: string
    time: string
    amount: string
    product: number[]
}

// do not use same name with ref
const form = reactive<RuleForm>({
    client: '',
    owner: '',
    ownerType: '',
    date: '',
    time: '',
    amount: '',
    product: []
})

const onSubmit = (formEl: FormInstance | undefined) => {
    ruleFormRef.value.validate((valid) => {
        if (valid) {
            console.log('表单验证ok');
            const order = {
                owner: form.owner,
                ownerType: form.ownerType,
                client: form.client,
                product: [],
                expiredTime: form.date + 'T' + form.time,
                amount: form.amount
            }
            for (const obj of rightValue.value) {
                order.product.push({
                        id: obj.key,
                        name: obj.label
                    })
            }

            axiosService.post('/order/submit', order).then((response) => {
                console.log('successful:', response);
            }).catch((error) => {
                console.error('失败:', error);
            });
        } else {
            console.log('表单验证失败');
        }
    })
}

const renderFunc: renderContent = (h, option) => h('span', null, option.label)

const handleChange = (
    value: number[],
    direction: TransferDirection,
    movedKeys: number[]
) => {
    if (direction === 'right') {
        for (const key of movedKeys) {
            rightValue.value.push(data.value.find(e => e.key === key))
            console.log(data.value.find(e => e.key === key))
        }
    } else {
        for (const key of movedKeys) {
            rightValue.value.splice(rightValue.value.indexOf(key), 1)
            console.log(rightValue.value)
        }
    }
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const validateEmpty = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('该选项不可为空'));
    } else {
        callback();
    }
};

const rules = reactive<FormRules<RuleForm>>({
    client: [{ validator: validateEmpty, trigger: 'blur' }],
    owner: [{ validator: validateEmpty, trigger: 'blur' }],
    ownerType: [{ validator: validateEmpty, trigger: 'blur' }],
    amount: [{ validator: validateEmpty, trigger: 'blur' }]
});
</script>

<template>
    <div class="container">
        <el-form ref="ruleFormRef" :model="form" :rules="rules" style="max-width: 100%">
            <el-form-item label="Client name:" prop="client">
                <el-input v-model="form.client" style="max-width: 30%" />
            </el-form-item>
            <el-form-item label="Owner name:" prop="owner">
                <el-input v-model="form.owner" style="max-width: 30%" />
            </el-form-item>
            <el-form-item label="Owner type:" prop="ownerType">
                <el-select v-model="form.ownerType" placeholder="please select owner type" style="max-width: 30%">
                    <el-option label="Individual" value="individual" />
                    <el-option label="Group" value="group" />
                </el-select>
            </el-form-item>
            <el-form-item label="Expiry time:">
                <el-date-picker v-model="form.date" type="date" placeholder="Pick a date" style="width: 14%"
                    format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
                <span class="text-gray-500" style="margin-left: 2%;margin-right: 2%;">--</span>
                <el-time-picker v-model="form.time" placeholder="Pick a time" style="width: 14%" format="HH:mm:ss"
                    value-format="HH:mm:ss" />
            </el-form-item>
            <el-form-item label="Amount:" prop="amount">
                <el-input v-model="form.amount" style="max-width: 30%" />
            </el-form-item>

            <el-transfer v-model="leftValue" style="text-align: left; display: inline-block" filterable
                :left-default-checked="[2, 3]" :right-default-checked="[1]" :render-content="renderFunc"
                :titles="['Source', 'Target']" :button-texts="['To left', 'To right']" :format="{
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}',
                }" :data="data" @change="handleChange">
                
                <template #left-footer>
                    <el-button class="transfer-footer" size="small">Select all</el-button>
                </template>
                <template #right-footer>
                    <el-button class="transfer-footer" size="small">Operation</el-button>
                </template>
            </el-transfer>

            <el-form-item style="margin-top: 3dvh;">
                <el-button type="primary" @click="onSubmit(ruleFormRef)">Submit</el-button>
                <el-button @click="resetForm(ruleFormRef)">Cancel</el-button>
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