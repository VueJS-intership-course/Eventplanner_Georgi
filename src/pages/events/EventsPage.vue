<template>
    <div class="container">
        <add-event v-if="store.isAddClicked" />
        <div class="wrapper d-flex flex-column flex-wrap mt-4">
            <EventControls />
            <EventList class="align-self-center p-3"/>
        </div>
    </div>
</template>

<script setup>
/*
   imports
*/
import EventControls from '@/components/Events/Catalog-controls/EventControls.vue';
import EventList from '@/components/Events/Catalog/EventList.vue';
import AddEvent from '@/components/Events/AddEvent.vue';
import { eventStore } from '@/store/events/eventStore.js';

/*
   event store
*/

const store = eventStore()
</script>


<style scoped lang="scss">
.wrapper {
    border-radius: 4%;
    @include page-background
}
</style>