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
    },
    title: {
        type: String,
        required: true
    }
})

const emits = defineEmits(['page-filter'])

const chartOptions = ref({
    chart: {
        map: mapData,
    },
    credits: {
        enabled: false
    },
    title: {
        text: props.title
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
    subtitle: {
        align: 'left',
        text: 'Events available by country',
        verticalAlign: 'middle'
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
    ],
    tooltip: {
        formatter: function () {
            return `${this.point.name} has ${this.point.value} events available`
        }
    },

    plotOptions: {
        series: {
            cursor: 'pointer',
            events: {
                click: function (e) {
                    emits('page-filter', e.point.name)
                }
            }
        }
    }
});

</script>


<style scoped>
.chart-container {
    /* height: 400px; */
    width: 100%;
}
</style>