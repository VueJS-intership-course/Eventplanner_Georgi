<template>
  <div>
    <Chart :options="chartOptions" ref="chart" :callback="chartIsLoaded"></Chart>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';

const chartOptions = ref({
  loading: {
    hideDuration: 1000,
    showDuration: 1000
  },
  credits: {
    enabled: false
  },
  title: {
    text: 'Hello'
  },
  series: [{
    cursor: 'pointer',
    point: {
      events: {
        click: function () {
          console.dir(this);
        },
      }
    },
    data: [0, 1, 2, 3]
  }, {
    data: [0, 4, 3, 2, 1]
  }],
  xAxis: {
    categories: ['Hi', 'Hello', 'How', 'Are']
  },
  yAxis: {
    alternateGridColor: '#FDFFD5'
  },
  annotations: [{
    labelOptions: {
      dragable: false,
      verticalAlign: 'top',
    },
    labels: [
      {
        point: {
          xAxis: 0,
          yAxis: 0,
          y: 1,
          x: 1,

        },
        text: 'Hello there'
      }]
  }],
  chart: {
    zoomType: 'x',
    resetZoomButton: {
      position: {
        x: 0,
        y: -30
      }
    }
  }

})
</script>
  
<style scoped lang="scss"></style>
  
   <!--

     chartOptions: {
          loading: {
            hideDuration: 1000,
            showDuration: 1000
          },
          credits: {
            enabled: false
          },
          title: {
            text: 'Hello'
          },
          series: [{
            cursor: 'pointer',
            point: {
              events: {
                click: function () {
                  console.dir(this);
                },
              }
            },
            data: [0, 1, 2, 3]
          }, {
            data: [0, 4, 3, 2, 1]
          }],
          xAxis: {
            categories: ['Hi', 'Hello', 'How', 'Are']
          },
          yAxis: {
            alternateGridColor: '#FDFFD5'
          },
          annotations: [{
            labelOptions: {
              dragable:false,
              verticalAlign: 'top',
            },
            labels: [
              {
                point: {
                  xAxis: 0,
                  yAxis:0,
                  y: 1,
                  x: 1,
  
                },
                text: 'Hello there'
              }]
          }],
          chart: {
            zoomType:'x',
            resetZoomButton: {
              position: {
                  x: 0,
                  y: -30
              }
          }
          }
        }
      }
   -->