<template>
    <section>
        <div class="container py-5 d-flex" v-if="store.events !== null && store.events.length">
            <event-card v-for="event in store.events" :event-data="event"></event-card>
        </div>
        <div v-else>
            <empty-events></empty-events>
        </div>
    </section>
</template>

<script setup>
/*
   imports
*/
import { eventStore } from '../../store/events/eventStore.js';
import EventCard from '@/components/Events/EventCard.vue';
import EmptyEvents from '@/components/Events/EmptyEvents.vue';

/*
   get events
*/

const store = eventStore();

store.getAllEvents();

</script>


<style scoped lang="scss">
.container {
    gap: 3rem
}
</style>