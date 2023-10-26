<template>
    <div class="event-header d-flex justify-content-between p-4 mb-5">
        <div v-if="isUserAdmin" class="add-event-menu">
            <button class="btn btn-primary" @click="openAdd">Add Event</button>
        </div>

        <div class="filter-controls d-flex">
            <button @click="openFilter" class="btn btn-primary">Filter by</button>
            <button @click="resetFilter" class="btn btn-primary">Reset Filter</button>
        </div>
        <div v-if="isFiltering">
            <Teleport to="body">
                <EventsFilter @close-filter="closeFilter" />
            </Teleport>
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
import EventSearch from '@/components/Events/EventSearch.vue';
import { eventStore } from '@/store/events/eventStore.js';
import EventsFilter from './EventsFilter.vue';

/*
   is user admin
*/

const users = authStore();

const isUserAdmin = computed(() => users.isCurrentUserAdmin);

/*
   emits
*/

const emits = defineEmits(['open-add']);

/*
   open Add Event modal
*/

const openAdd = () => {
    emits('open-add')
}

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

const isFiltering = ref(false);

const resetFilter = () => {
    events.filterReset()
}


const openFilter = () => {
    isFiltering.value = true;
}


const closeFilter = () => {
    isFiltering.value = false;
}
</script>

<style scoped lang="scss">
.event-header {
    background-color: rgb(62, 62, 78);

    .filter-controls {
        gap:1rem
    }
}
</style>