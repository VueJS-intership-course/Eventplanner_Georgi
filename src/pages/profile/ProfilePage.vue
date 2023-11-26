<template>
    <div class="container d-flex flex-column justify-content-center mt-4 p-5">
        <ProfileCard class="col-md-7 mx-auto" />
        <CalendarComponent class="col-md-7 mx-auto" v-if="usersEvents && !isUserAdmin" :data="usersEvents"
            title="My events calendar" @date-click="handleCalendarClick" />
        <EditProfile v-if="store.isEditing" />
    </div>
</template>

<script setup>
import ProfileCard from '@/components/Users/ProfileCard.vue';
import { authStore } from '@/store/auth/authStore.js';
import EditProfile from '@/components/Users/EditProfile.vue';
import CalendarComponent from '@/components/Calendar/CalendarComponent.vue';
import { eventStore } from '@/store/events/eventStore.js';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

/*
   router
*/
const router = useRouter()

/*
   auth & event store
*/
const store = authStore();
const events = eventStore();

/*
   get all events
*/

events.getAllEvents()

/*
   check if users has events
*/
const usersEvents = computed(() => store.currentUser ? events.usersEvent(store.currentUser.email) : null)

/*
   check if user is admin
*/
const isUserAdmin = computed(() => store.isCurrentUserAdmin)

/*
   calendar events 
*/

const handleCalendarClick = (event) => {
    router.push({ name: 'Single-Event', params: { id: event.id } })
}

</script>

<style lang="scss" scoped>
.container {
    @include page-background;
    gap:3rem
}
</style>