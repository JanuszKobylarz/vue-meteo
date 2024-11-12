<script lang="ts" setup>
import { onMounted } from 'vue';
import { Bar } from 'vue-chartjs';

import { useMeteo } from './useMeteo';

const { chartData, callAPI } = useMeteo();

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}

onMounted(() => {
    callAPI()
})
    
</script>

<template>
    <Bar v-if="chartData.labels[0]" id="chart" :data="chartData" :options="chartOptions"/>
</template>

<style lang="postcss" scoped>
    
</style>
