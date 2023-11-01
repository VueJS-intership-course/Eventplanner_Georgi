<template>
    <div>
        <div v-if="store.isEditing">
            <EditEvent />
        </div>
        <div class="signle-event container d-flex flex-column justify-content-center align-items-center p-4 mt-4">
            <div>
                <SingleEventCard />
            </div>
            <div>
                <MapComp v-if="store.currentEvent" @map-ready="onMapReady" />
            </div>
        </div>

    </div>
</template>

<script setup>
/*
   imports
*/
import EditEvent from '../../components/Events/EditEvent.vue';
import { eventStore } from '@/store/events/eventStore.js';
import { ref } from 'vue';
import MapComp from '@/components/Map/MapComp.vue';
import mapLayers from '@/utils/mapLayers.js';
import SingleEventCard from '../../components/Events/SingleEventCard.vue';

/*
   props
*/

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})


/*
   store -> Current Event
*/
const store = eventStore();

store.getCurrentEvent(props.id);

/*
   Map handling
*/

const mapInstance = ref(null);


const onMapReady = (map) => {
    mapInstance.value = map;
    const layer = mapLayers.createSingleLayer(store.currentEvent);
    mapInstance.value.addLayer(layer);
    const extent = layer.getSource().getExtent();
    mapInstance.value
        .getView()
        .fit(extent, { duration: 2400, zoom: 100 });
}


</script>

<style scoped lang="scss">
@import '../../styles/variables.scss';

.signle-event {
    width: 100%;
    gap: 4rem;
    @include page-background;

    .container {
        justify-content: center;
        align-items: center;
        gap: 2rem;


        .card-footer {
            gap: 1rem;
        }
    }
}
</style>

