<template>
    <div class="container d-flex flex-column justify-content-center p-5">
        <h2 class="fw-bold text-light align-self-center">Analytics</h2>
        <LineChart v-if="store.events" :categories="constants.eventsChartCategories" title="Events analytics"
            @page-filter="handleChartEvent" :data="data" type="column" />
        <h3 v-if="!store.events" class="fw-bold text-light align-self-center">There is no analytics yet!</h3>
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