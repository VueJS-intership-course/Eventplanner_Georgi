<template>
  <div>
    <Chart :options="chartOptions" ref="chart"></Chart>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';

const emits = defineEmits(['page-filter'])

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: "Chart"
  },
  type: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  categories: {
    type:Array,
  }
})


const chartOptions = ref({
  credits: {
    enabled: false
  },
  title: {
    text: props.title
  },
  subtitle: {
    text: props.subtitle
  },
  series: props.data,
  xAxis: {
    categories: props.categories
  },
  yAxis: {
    alternateGridColor: '#FDFFD5'
  },
  chart: {
    type: props.type,
    zoomType: 'x',
    resetZoomButton: {
      position: {
        x: 0,
        y: -30
      }
    }
  },
  plotOptions: {
    series: {
      cursor: 'pointer',
      events: {
        click: function (event) {
          const monthIndex = event.point.options.x;
          emits('page-filter', monthIndex);
        }
      }
    }
  }
})
</script>
  
<style scoped lang="scss"></style>
