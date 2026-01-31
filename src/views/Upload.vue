<template>
    <el-upload ref="uploadRef" class="upload-demo" action="#" :auto-upload="false"
        multiple :file-list="fileList" :on-preview="handlePreview" :on-remove="handleRemove"  method="POST" :http-request="upload">
        <template #trigger>
            <el-button type="primary">select file</el-button>
        </template>

        <el-button class="ml-3" type="success" @click="submit">
            upload to server
        </el-button>

        <template #tip>
            <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
            </div>
        </template>
    </el-upload>
</template>

<script lang="ts" setup>
import { otherService } from '@/utils/axiosService';
import { ref } from 'vue'
import type { UploadInstance } from 'element-plus'

const uploadRef = ref<UploadInstance>()

const fileList = ref([])

const submit = () => {
    uploadRef.value!.submit()
}
const handlePreview = (file) => {
    console.log(file);
}

const handleRemove = (file, fileList) => {
    console.log(file, fileList);
}

const upload = (options) => {
    uploadRef.value!.clearFiles()
    const { file, onSuccess, onError, onProgress } = options;
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    const formData = new FormData()
    formData.append('file', file)
    formData.append('id', '12')
    formData.append('name', 'ab;ss;')
    formData.append('size', '1024')
    return otherService.post('/upload/single', formData, config).then((response) => {console.log('successful')}).catch((error) => {console.log('failed' + error)})
}
</script>