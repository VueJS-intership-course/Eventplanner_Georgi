<template>
  <div>
    <Chart :options="chartOptions" ref="chart" :callback="chartIsLoaded"></Chart>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';

const chartIsLoaded = () => {
  console.log('Loaded');
}

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default:"Chart"
  }
})

const chartOptions = ref({
  credits: {
    enabled: false
  },
  title: {
    text: props.title
  },
  series: props.data,
  xAxis: {
    categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  },
  yAxis: {
    alternateGridColor: '#FDFFD5'
  },
  chart: {
    zoomType: 'x',
    resetZoomButton: {
      position: {
        x: 0,
        y: -30
      }
    }
  },
})
</script>
  
<style scoped lang="scss"></style>
