<template>
    <div v-if="store.currentEvent" class="container d-flex flex-column justify-content-center p-5">
        <h2 class="fw-bold text-light text-center p-3">{{ store.currentEvent.name }}'s analytics</h2>
        <LineChart type="pie" :data="data" :title="store.currentEvent.name" :subtitle="`Budget: ${store.currentEvent.budget}$`"/>
    </div>
</template>

<script setup>
/*
  imports
*/
import { computed } from 'vue';
import LineChart from '@/components/Charts/LineChart.vue';
import { eventStore } from '@/store/events/eventStore.js';

/*
   props
*/
const props = defineProps({
    id: {
        type:String,
        required:true
    }
})

/*
  store
*/
const store = eventStore();

/*
   get current event
*/
store.getCurrentEvent(props.id)

/*
  retrieve single event analytics
*/
const data = computed(() => store.singleEventAnalytics)
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.container {
    @include page-background
}
</style>