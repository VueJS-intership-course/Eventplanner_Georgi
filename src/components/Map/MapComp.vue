<template>
    <div :class="{small: isSmall}" class="map" id="map"></div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

const props = defineProps({
    isSmall: {
        type:Boolean,
    }
})

const emit = defineEmits(['map-ready']);
let map = ref({});

onMounted(() => {
    InitializeMap();
});

function InitializeMap() {
    map = new Map({
        target: 'map',
        view: new View({
            center: [0, 0],
            zoom: 1
        }),
        layers: [new TileLayer({
            source: new OSM()
        })]
    });

    map.once('postrender', () => {
        emit('map-ready', map);
    });
}
</script>
  
<style scoped>
.map {
    width: 800px;
    height: 320px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.small { 
    width: 500px;
    height: 300px;
}
</style>
  