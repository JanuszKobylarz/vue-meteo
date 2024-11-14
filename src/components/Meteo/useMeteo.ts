import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import ky from 'ky';
import moment from 'moment';
import { reactive, ref } from 'vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
	
export function useMeteo() {
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

    const current = ref({})
    
    const callAPI = async() => {
        data.value = await ky.get(
            url +'?'+ new URLSearchParams(params).toString()
        ).json()
    
        chartData.labels = data.value.hourly.time.map((date) => {
            if(moment(date).format('HH:mm') == '00:00') {
                return moment(date).format("HH:mm:ss DD-MM-YYYY")
            }
            return moment(date).format('HH:mm')
        })
        chartData.datasets[0].data = data.value.hourly.temperature_2m
        current.value = data.value.current;
    }

    return { chartData, current, data, callAPI }
}

