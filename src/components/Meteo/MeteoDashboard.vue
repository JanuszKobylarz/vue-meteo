<script lang="ts" setup>
import ky from 'ky';
import { onMounted, reactive, ref } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
	
    const params = {
        "latitude": '52.73',
        "longitude": '15.22',
        "current": "temperature_2m",
        "hourly": "temperature_2m"
    };
    const url = "https://api.open-meteo.com/v1/forecast";

    const data = ref([]);
    const chartData = reactive({
        labels: [],
        datasets: [
            {
                data: []
            }
        ]
    })

    const callAPI = async() => {
        data.value = await ky.get(
            url +'?'+ new URLSearchParams(params).toString()
        ).json()

        chartData.labels = data.value.hourly.time;
        chartData.datasets[0].data = data.value.hourly.temperature_2m;

        console.log(chartData)
    }

    onMounted(() => {
        callAPI()
    })

    
</script>

<template>
    <Bar v-if="chartData.labels[0]" id="chart" :data="chartData"/>
</template>

<style lang="postcss" scoped>
    
</style>
