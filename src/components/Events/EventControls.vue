<template>
    <div class="event-header d-flex justify-content-between p-4 mb-5">
        <div v-if="isUserAdmin" class="add-event-menu">
            <button class="btn btn-primary" @click="openAdd">Add Event</button>
        </div>
        <div>
            <EventSearch/>
        </div>
    </div>
</template>


<script setup>
/*
   imports
*/

import { authStore } from '../../store/auth/authStore.js';
import { computed } from 'vue';
import EventSearch from './EventSearch.vue';

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

</script>

<style scoped lang="scss">
.event-header {
    background-color: rgb(62, 62, 78);
}
</style>