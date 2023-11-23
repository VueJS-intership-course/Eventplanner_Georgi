<template>
    <section>
        <div class="container py-2" v-if="store.events !== null && store.filteredEvents.length">
            <TransitionGroup name="list" tag="ul">
                <event-card v-for="event in store.filteredEvents" :key="event.id" :event-data="event"></event-card>
            </TransitionGroup>
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
@import url("https://fonts.googleapis.com/css2?family=Baloo+2&display=swap");
@import '../../../styles/variables.scss';



.light {
    background: #f3f5f7;
};


#pageHeaderTitle {
    margin: 2rem 0;
    text-transform: uppercase;
    text-align: center;
    font-size: 2.5rem;
}

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