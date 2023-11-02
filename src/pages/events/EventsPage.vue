<template>
    <div class="container">
        <div v-if="store.isAddClicked">
            <add-event></add-event>
        </div>
        <div class="wrapper d-flex flex-column flex-wrap mt-4">
            <div>
                <EventControls />
            </div>
            <div class="align-self-center p-5">
                <EventList />
            </div>
        </div>
    </div>
</template>

<script setup>
/*
   imports
*/
import EventControls from '@/components/Events/Event-controls/EventControls.vue';
import EventList from '@/components/Events/EventList.vue';
import AddEvent from '@/components/Events/AddEvent.vue';
import { eventStore } from '@/store/events/eventStore.js';

/*
   event store
*/

const store = eventStore()
</script>


<style scoped lang="scss">
@import '../../styles/variables.scss';
.wrapper {
    border-radius: 4%;
    @include page-background
}
</style>