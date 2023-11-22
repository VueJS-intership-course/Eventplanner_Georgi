<template>
    <div>
        <div v-if="store.isEditing">
            <EditEvent />
        </div>
        <div class="signle-event container d-flex flex-column justify-content-center align-items-center p-4 mt-4">
            <div>
                <SingleEventCard />
            </div>
            <div v-if="store.isAddExpense">
                <AddExpense/>
            </div>
            <div v-if="store.currentEvent">
                <MapComp @map-ready="onMapReady" />
            </div>
        </div>
    </div>
</template>

<script setup>
/*
   imports
*/
import EditEvent from '@/components/Events/SingleEvent/EditEvent.vue';
import { eventStore } from '@/store/events/eventStore.js';
import { ref } from 'vue';
import MapComp from '@/components/Map/MapComp.vue';
import mapLayers from '@/utils/mapLayers.js';
import SingleEventCard from '@/components/Events/SingleEvent/SingleEventCard.vue';
import AddExpense from '@/components/Events/SingleEvent/AddExpense.vue';

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
    gap: 2.5rem;
    @include page-background;

    .container {
        justify-content: center;
        align-items: center;
        gap: 2rem;

    }
}
</style>

