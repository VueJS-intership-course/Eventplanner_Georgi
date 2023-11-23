<template>
    <div class="event-header d-flex justify-content-between p-4 mb-5">
        <EventsFilter v-if="events.isFiltering" />
        <div v-if="isUserAdmin" class="add-event-menu">
            <button class="btn btn-primary" @click="openAdd">Add Event</button>
        </div>
        <div class="filter-controls d-flex">
            <button @click="openFilter" class="btn btn-primary">Filter by</button>
            <button @click="resetFilter" v-if="hasQueryParameters" class="btn btn-primary">Reset Filter</button>
        </div>
        <div>
            <EventSearch v-model="searchValue" />
        </div>
    </div>
</template>


<script setup>
/*
   imports
*/

import { authStore } from '@/store/auth/authStore.js';
import { computed, ref, watch } from 'vue';
import EventSearch from '@/components/Events/Catalog-controls/EventSearch.vue';
import { eventStore } from '@/store/events/eventStore.js';
import EventsFilter from '@/components/Events/Catalog-controls/EventsFilter.vue';
import { useRouter } from 'vue-router';

/*
   router
*/

const router = useRouter()

/*
   is user admin
*/

const users = authStore();

const isUserAdmin = computed(() => users.isCurrentUserAdmin);


/*
   search
*/

const events = eventStore();

const searchValue = ref('');


watch(() => searchValue.value, (newVal) => {
    events.searchQuery = newVal
})

/*
  filters
*/

const hasQueryParameters = computed(() => Object.keys(router.currentRoute.value.query).length > 0);



const resetFilter = () => {
    events.filterReset()
}


const openFilter = () => {
    events.isFiltering = true;
}


/*
   open Add Event modal
*/

const openAdd = () => {
    events.isAddClicked = true
}
</script>

<style scoped lang="scss">
.event-header {

    .filter-controls {
        gap: 1rem
    }
}
</style>