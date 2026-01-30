<template>
    <div>
        <el-button type="primary" @click="download()">download</el-button>
    </div>
</template>

<script setup lang="ts">
import axiosService from '@/utils/axiosService';
// const download = (data: any, filename = 'data.json') => {
//     const foo = { hello: "world" };
//     const blob = new Blob([JSON.stringify(foo)], type: 'application/vnd.ms-excel;charset=utf-8');
//     const fileName = `${new Date().valueOf()}.xls`;
//     const link = document.createElement('a');
//     link.href = window.URL.createObjectURL(blob);
//     link.download = fileName;
//     link.click();
//     window.URL.revokeObjectURL(link.href);
// }

const download = () => {
    axiosService.get(`url`, {
        responseType: 'arraybuffer',
    }).then(res => {
        if (res.status == 200) {
            const blob = new Blob([res.data], {
                type: 'application/vnd.ms-excel;charset=utf-8'
            });
            const fileName = `yourfile.xls`;
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

const blobDownload = (res: any, type: string, filename: string) => {
    const blob = new Blob([res], {
        type: type
    })
    const a = document.createElement('a')
    const URL = window.URL || window.webkitURL
    const href = URL.createObjectURL(blob)
    a.href = href
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.removeChild(a)
    window.URL.revokeObjectURL(href)
}
</script>