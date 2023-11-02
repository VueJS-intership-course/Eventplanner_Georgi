<template>
    <div class="container d-flex flex-column justify-content-center mt-4 p-5">
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-md-7">
                <ProfileCard />
            </div>
            <div v-if="usersEvents && !isUserAdmin" class="d-flex flex-column justify-content-center align-items-center">
                <h2 class="fw-bold">My events calendar</h2>
                <CalendarComponent :data="usersEvents" @date-click="handleCalendarClick"/>
            </div>
            <div v-if="store.isEditing">
                <EditProfile />
            </div>
        </div>
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
const usersEvents = computed(() => events.usersEvent(store.currentUser.email))

const isUserAdmin = computed(() => store.isCurrentUserAdmin)

/*
   calendar events 
*/

const handleCalendarClick = (event) => {
    router.push({name:'Single-Event', params:{id:event.id}})
} 

</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.container {
    @include page-background;

    .row {
        gap:2rem;
    }
}
</style>