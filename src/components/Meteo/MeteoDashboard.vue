<script lang="ts" setup>
import { onMounted } from 'vue';
import { Bar } from 'vue-chartjs';

import { useMeteo } from './useMeteo';
import CurrentCard from './CurrentCard.vue';

const { chartData, current,  callAPI } = useMeteo();

const chartOptions = {
  responsive: false,
  maintainAspectRatio: true
}

onMounted(() => {
    callAPI()
})
    
</script>

<template>
    <CurrentCard :current="current" />
    <Bar width="10000" height="500" v-if="chartData.labels[0]" id="chart" :data="chartData" :options="chartOptions"/>
</template>

<style lang="postcss" scoped>
    
</style>
