<template>
    <section>
        <TransitionGroup v-if="store.events !== null && store.filteredEvents.length" name="list" tag="ul">
            <event-card v-for="event in store.filteredEvents" :key="event.id" :event-data="event"></event-card>
        </TransitionGroup>
        <empty-events v-if="!store.events || !store.filteredEvents.length"></empty-events>
    </section>
</template>

<script setup>
/*
   imports
*/
import { eventStore } from '@/store/events/eventStore.js';
import EventCard from '@/components/Events/Catalog/EventCard.vue';
import EmptyEvents from '@/components/Events/Catalog/EmptyEvents.vue';

/*
   get all events
*/

const store = eventStore();

store.getAllEvents();


</script>


<style scoped lang="scss">
.list-enter-active,
.list-leave-active {
    transition: all 0.6s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>