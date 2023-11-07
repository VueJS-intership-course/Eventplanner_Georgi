<template>
    <div class="container d-flex flex-column justify-content-center p-5">
        <div class="align-self-center">
            <h2 class="h1 fw-bold text-light">Analytics</h2>
        </div>
        <div class="row">
            <LineChart v-if="store.events" title="Events analytics" :data="data"/>
        </div>
    </div>
</template>

<script setup>
/*
   imports
*/
import LineChart from '@/components/Charts/LineChart.vue';
import { eventStore } from '../../store/events/eventStore';
import { computed } from 'vue';

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

</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.container {
    @include page-background;
    gap:2rem
}
</style>