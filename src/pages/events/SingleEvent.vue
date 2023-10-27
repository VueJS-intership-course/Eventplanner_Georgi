<template>
    <div class="signle-event container d-flex flex-column justify-content-center align-items-center p-4 mt-4">
        <div v-if="store.currentEvent" class="container d-flex mt-4 p-4 bg-light ">
            <div class="pmd-card-media">
                <img :src="store.currentEvent.imgSrc" width="600" height="500" class="img-fluid">
            </div>
            <div class="">
                <div class="card-header mb-4">
                    <h2 class="card-title">{{ store.currentEvent.name }}</h2>
                    <p class="card-subtitle">{{ $formatDateInTimeZone(store.currentEvent.location, store.currentEvent.date, store.currentEvent.time) }}</p>
                </div>
                <div class="card-body mb-4">
                    <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quis est nam,
                        similique
                        exercitationem eius. Incidunt distinctio quis tempore voluptate maxime accusantium ratione placeat,
                        voluptates quam ab, doloremque, vero mollitia?</p>
                </div>
                <ul class="list-group pmd-list mb-4">
                    <li class="list-group-item d-flex flex-row">
                        <span class="media-body">Tickets available: {{ store.currentEvent.ticket }}</span>
                    </li>
                    <li class="list-group-item d-flex flex-row">
                        <div class="media-body">Ticket price: {{ store.currentEvent.price }}$</div>
                    </li>
                </ul>
                <div class="card-footer">
                    <button v-if="!isAdmin" type="button" class="btn pmd-btn-flat pmd-ripple-effect btn-primary">Buy
                        Ticket</button>
                    <button v-if="isAdmin" class="btn pmd-btn-flat pmd-ripple-effect btn-primary" type="button">Edit</button>
                </div>
            </div>
        </div>
        <div>
            <MapComp v-if="store.currentEvent" @map-ready="onMapReady" />
        </div>
    </div>
</template>

<script setup>
/*
   imports
*/
import { eventStore } from '@/store/events/eventStore.js';
import { authStore } from '@/store/auth/authStore.js';
import { computed, ref } from 'vue';
import MapComp from '@/components/Map/MapComp.vue';
import mapLayers from '@/utils/mapLayers.js';

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
   store -> is user Admin
*/

const users = authStore();

const isAdmin = computed(() => users.isCurrentUserAdmin);

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
        gap: 2rem
    }
}
</style>

