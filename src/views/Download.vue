<template>
    <div>
        <el-input v-model="url" style="width: 240px" placeholder="Please input"></el-input>
        <el-button type="primary" @click="download">download</el-button>
    </div>
</template>

<script setup lang="ts">
import { otherService } from '@/utils/axiosService';
import { ref } from 'vue';

const url = ref('/download/single')

const download = () => {
    otherService.get(url.value).then(res => {
        console.log(res)
        if (res.status == 200) {
            const blob = new Blob([res.data], {
                type: 'text/plain;charset=utf-8'
            });
            const fileName = `yourfile.txt`;
            const objectUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = objectUrl;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(link.href);
        } else {
            // error handler
            console.error('download error')
        }
    });
}
</script>