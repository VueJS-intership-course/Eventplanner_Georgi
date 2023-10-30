<template>
    <div class="container d-flex flex-column align-items-center justify-conent-center mt-5 p-5">
        <div class="mb-5">
            <WelcomeCard />
        </div>
        <div class="events-map">
            <h2 class="subHead fw-bold text-center text-light">Events worldwide</h2>
        </div>
        <MapChart v-if="store.eventStatistic" :data="store.eventStatistic" name="Event information"/>

    </div>
</template>

<script setup>
/*
   imports
*/
import { eventStore } from '@/store/events/eventStore.js';
import WelcomeCard from '@/common-templates/WelcomeCard.vue';
import MapChart from '../components/Charts/MapChart.vue';



/*
   map handling
*/

const store = eventStore();

store.getAllEvents();
store.getStatistics()
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