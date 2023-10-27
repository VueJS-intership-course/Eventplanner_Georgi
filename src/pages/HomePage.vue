<template>
    <div class="container d-flex flex-column align-items-center justify-conent-center mt-5 p-5">
        <div class="mb-5">
            <WelcomeCard />
        </div>
        <div class="events-map">
            <h2 class="subHead fw-bold text-center text-light">Events worldwide</h2>
            <MapComp v-if="store.events" @map-ready="mapLoaded" />
            <MapPopup ref="popup" id="journey-info">
                <template v-if="feature">
                    <h4>{{ feature.getProperties().properties.name }}</h4>
                    <p>{{ $formatDateInTimeZone(feature.getProperties().properties.location,
                        feature.getProperties().properties.date, feature.getProperties().properties.time) }}</p>
                    <router-link class="btn btn-primary"
                        :to="{ name: 'Single-Event', params: { id: feature.getProperties().properties.id } }">See
                        details</router-link>
                </template>
            </MapPopup>
        </div>
    </div>
</template>

<script setup>
/*
   imports
*/
import MapComp from '@/components/Map/MapComp.vue';
import { eventStore } from '@/store/events/eventStore.js';
import MapPopup from '@/components/Map/MapPopup.vue';
import mapLayers from '@/utils/mapLayers.js';
import { ref } from 'vue';
import WelcomeCard from '@/common-templates/WelcomeCard.vue';

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
    const layers = mapLayers.createMultipleLayers(store.events);
    mapInstance.value.addLayer(layers);
    mapInstance.value.on('click', (event) => {
        handleMapClick(event.coordinate)
        popup.value.overlay.setPosition(event.coordinate)
    })
}

const handleMapClick = (coordinate) => {
    const clickedFeature = mapInstance.value.forEachFeatureAtPixel(
        mapInstance.value.getPixelFromCoordinate(coordinate),
        (feature) => feature
    );


    if (clickedFeature && clickedFeature.getProperties().properties.name) {
        feature.value = clickedFeature;
    }else {
        feature.value = null;
        popup.value.overlay.setPosition(undefined)
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
}</style>