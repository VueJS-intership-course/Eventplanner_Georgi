<template>
        <div v-if="store.currentEvent" class="container d-flex mt-4 p-4 bg-light ">
            <div class="pmd-card-media">
                <img :src="store.currentEvent.imgSrc" width="600" height="500" class="img-fluid">
            </div>
            <div class="">
                <div class="card-header mb-4">
                    <h2 class="card-title">{{ store.currentEvent.name }}</h2>
                    <p class="card-subtitle">{{ $formatDateInTimeZone(store.currentEvent.location,
                        store.currentEvent.date,
                        store.currentEvent.time) }}</p>
                </div>
                <div class="card-body mb-4">
                    <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quis est nam,
                        similique
                        exercitationem eius. Incidunt distinctio quis tempore voluptate maxime accusantium ratione
                        placeat,
                        voluptates quam ab, doloremque, vero mollitia?</p>
                </div>
                <ul class="list-group pmd-list mb-4">
                    <li class="list-group-item d-flex flex-row">
                        <span class="media-body">Country: {{ store.currentEvent.country }}</span>
                    </li>
                    <li class="list-group-item d-flex flex-row">
                        <span class="media-body">Tickets available: {{ store.currentEvent.ticket }}</span>
                    </li>
                    <li class="list-group-item d-flex flex-row">
                        <div class="media-body">Ticket price: {{ store.currentEvent.price }}$</div>
                    </li>
                </ul>
                <div class="card-footer d-flex">
                    <button v-if="!isAdmin && users.currentUser" type="button"
                        class="btn pmd-btn-flat pmd-ripple-effect btn-primary">Buy
                        Ticket</button>
                    <button v-if="isAdmin" class="btn pmd-btn-flat pmd-ripple-effect btn-primary" @click="editEvent"
                        type="button">Edit</button>
                    <button v-if="isAdmin" class="btn pmd-btn-flat pmd-ripple-effect btn-danger" @click="deleteEvent"
                        type="button">Delete</button>
                </div>
            </div>
        </div>
</template>


<script setup>
import {eventStore} from '../../store/events/eventStore';
import { authStore } from '@/store/auth/authStore.js';
import { useRouter } from 'vue-router';
import { computed } from 'vue';


const router = useRouter();

const store = eventStore();
const users = authStore();

const isAdmin = computed(() => users.isCurrentUserAdmin);


/*
   handle delete event
*/

const deleteEvent = async () => {
    console.log(props.id);
   await store.deleteEvent(props.id);

   router.push({name:'Event-Catalog'})
}


/*
   handle edit event
*/

const editEvent = () => {
    store.editedEvent = store.currentEvent

    store.isEditing = true;
}

</script>