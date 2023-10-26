<template>
    <div class="container d-flex flex-column align-items-center justify-conent-center mt-5 p-5">
        <div class="mb-5">
            <WelcomeCard/>
        </div>
        <div class="events-map">
            <h2 class="subHead fw-bold text-center">Find the perfect event for you</h2>
            <MapComp v-if="store.events" @map-ready="mapLoaded" />
            <MapPopup ref="popup" id="journey-info">
                <template v-if="feature">
                    <h4>{{ feature.getProperties().properties.name }}</h4>
                    <p>{{ $formatDateInTimeZone(feature.getProperties().properties.location, feature.getProperties().properties.date, feature.getProperties().properties.time) }}</p>
                    <router-link class="btn btn-primary" :to="{name:'Single-Event', params:{id:feature.getProperties().properties.id}}">See details</router-link>
                </template>
            </MapPopup>
        </div>
    </div>
</template>

<script setup>
/*
   imports
*/
import MapComp from '../components/Map/MapComp.vue';
import { eventStore } from '../store/events/eventStore';
import MapPopup from '../components/Map/MapPopup.vue';


import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import Feature from 'ol/Feature';
import VectorSource from "ol/source/Vector";
import Point from "ol/geom/Point.js";
import { ref } from 'vue';
import WelcomeCard from '../common-templates/WelcomeCard.vue';

/*
   map handling
*/

const store = eventStore();
store.getAllEvents();


const mapInstance = ref(null);
const feature = ref(null);
const popup = ref(null);

const mapLoaded = (map) => {
    mapInstance.value = map
    mapInstance.value.addOverlay(popup.value.overlay)
    const layers = createLayer(store.events);
    mapInstance.value.addLayer(layers);
    mapInstance.value.on('click', (event) => {
        handleMapClick(event.coordinate)
        popup.value.overlay.setPosition(event.coordinate)
    })
}


const createLayer = (events) => {
    const features = events.map(item => new Feature({
        geometry: new Point(fromLonLat([item.location[0], item.location[1]])),
        properties: item
    }))


    const source = new VectorSource({
        features: features
    });

    return new VectorLayer({ source });
}

const handleMapClick = (coordinate) => {
    const clickedFeature = mapInstance.value.forEachFeatureAtPixel(
        mapInstance.value.getPixelFromCoordinate(coordinate),
        (feature) => feature
    );


    if (clickedFeature) {
        feature.value = clickedFeature;
    }

}


</script>

<style scoped lang="scss">
@import '../styles/variables.scss';
.container {
    @include page-background;

    .subHead {
        text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
    }
}
</style>