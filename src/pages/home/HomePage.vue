<template>
    <div class="container d-flex flex-column  justify-conent-center mt-5 p-5">
        <WelcomeCard class="mb-5"/>
        <MapChart v-if="store.eventStatistic" :data="store.eventStatistic" name="Event information"
            @page-filter="handleMapChartClick" title="Events Worldwide" />
    </div>
</template>

<script setup>
/*
   imports
*/
import { eventStore } from '@/store/events/eventStore.js';
import WelcomeCard from '@/common-templates/WelcomeCard.vue';
import MapChart from '@/components/Charts/MapChart.vue';
import { useRouter } from 'vue-router';

/*
   router 
*/
const router = useRouter();


/*
   store
*/
const store = eventStore();


/*
   generate linechart map data
*/
store.getAllEvents();
store.getStatistics();


/*
   handle map click
*/
const handleMapChartClick = (countryName) => {
    router.push({ name: 'Event-Catalog', query: { location: countryName } });
}
</script>

<style scoped lang="scss">
.container {
    @include page-background;

    .subHead {
        text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
    }
}
</style>