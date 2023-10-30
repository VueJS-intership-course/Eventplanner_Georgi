<template>
    <div class="chart-container">
        <Chart :constructor-type="'mapChart'" :options="chartOptions"></Chart>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import mapData from '@highcharts/map-collection/custom/world.topo.json';

const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})


const chartOptions = ref({
    chart: {
        map: mapData
    },
    title: {
        text: "Highmaps basic demo"
    },
    mapNavigation: {
        enabled: true,
        buttonOptions: {
            alignTo: "spacingBox"
        }
    },
    colorAxis: {
        min: 0
    },
    series: [
        {
            name: props.name,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            },
            joinBy: 'name',
            states: {
                hover: {
                    color: "#BADA55"
                }
            },
            allAreas: true,
            data: props.data
        }
    ]
});

</script>


<style scoped>
.chart-container {
    height: 400px;
    width: 100%;
}
</style>