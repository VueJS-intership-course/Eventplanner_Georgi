<template>
    <div class="container d-flex flex-column justify-content-center p-5">
        <div class="align-self-center">
            <h2 class="h1 fw-bold text-light">Analytics</h2>
        </div>
        <div v-if="store.events" class="row">
            <LineChart :categories="constants.eventsChartCategories" title="Events analytics" @page-filter="handleChartEvent" :data="data" type="column" />
        </div>
        <div v-if="!store.events">
            <h2>There is no analytics yet!</h2>
        </div>
    </div>
</template>

<script setup>
/*
   imports
*/
import LineChart from '@/components/Charts/LineChart.vue';
import { eventStore } from '@/store/events/eventStore.js';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import moment from 'moment';
import constants from '@/utils/constants.js';

/*
  router
*/
const router = useRouter();

/*
   store
*/
const store = eventStore();

/*
   get all events
*/
store.getAllEvents()

/*
   get line chart analytics data
*/
const data = computed(() => store.getFullAnalytics);

/*
   handle chart event
*/

const handleChartEvent = (monthIndex) => {
    const startDate = new Date(2023, monthIndex, 1);
    const endDate = new Date(2023, monthIndex + 1, 0);

    const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
    const formattedEndDate = moment(endDate).format('YYYY-MM-DD');

    router.push({ name: 'Event-Catalog', query: { startDate: formattedStartDate, endDate: formattedEndDate } });
};

</script>

<style lang="scss" scoped>

.container {
    @include page-background;
    gap: 2rem
}
</style>