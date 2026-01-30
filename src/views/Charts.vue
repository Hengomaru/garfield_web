<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts'

const chartRef = ref(null)
let chartInstance = null

const init = () => {
    if(chartRef.value){
        chartInstance = echarts.init(chartRef.value)

        const option = {
            title: {
                text: 'test 1'
            },
            tooltip: {},
            legend: {
                data: ['sale']
            },
            xAxis: {
                type: 'category',
                data: ['football', 'basketball', 'baseball', 'tennis', 'pingpong', 'volleyball']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'sale',
                    xAxisIndex: 0,
                    type: 'bar',
                    data: [5, 32, 12, 11, 3, 15]
                }
            ]
        }

        chartInstance.setOption(option)
    }
}

const resizeChart = () => {
    chartInstance?.resize()
}

onMounted(() => {
    init()
    window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeChart)
    chartInstance?.dispose()
})
</script>

<template>
    <div class="container" ref="chartRef">
    </div>
</template>

<style lang="less" scoped>
.container {
    height: 100%;
    width: 100%;
}
</style>