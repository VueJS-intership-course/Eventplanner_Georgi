<template>
    <div v-if="store.currentEvent" class="container d-flex mt-4 p-4 bg-light ">
        <div class="pmd-card-media">
            <img :src="store.currentEvent.imgSrc" width="600" height="500" class="img-fluid">
        </div>
        <div class="">
            <div class="card-header mb-4">
                <h2 class="card-title">{{ store.currentEvent.name }}</h2>
                <p class="card-subtitle">{{ $formatDateInTimeZone(store.currentEvent.location, store.currentEvent.dateTime)
                }}
                </p>

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
                <li v-if="isAdmin" class="list-group-item d-flex flex-row">
                    <div class="media-body">Budget: {{ store.currentEvent.budget }}</div>
                </li>
            </ul>
            <div class="card-footer d-flex">
                <button v-if="!isAdmin && users.currentUser && !hasUserBoughtTIcket" type="button"
                    class="btn pmd-btn-flat pmd-ripple-effect btn-primary" @click="handleBuyTicket">Buy
                    Ticket</button>
                <router-link v-if="isAdmin" class="btn pmd-btn-flat pmd-ripple-effect btn-primary"
                    :to="{ name: 'Event-Budget', params: { id: store.currentEvent.id } }"
                    type="button">Analytics</router-link>
                <button v-if="isAdmin" class="btn pmd-btn-flat pmd-ripple-effect btn-primary" type="button"
                    @click="openAddExpense">Add
                    Expense</button>
                <button v-if="isAdmin" class="btn pmd-btn-flat pmd-ripple-effect btn-primary" @click="editEvent"
                    type="button">Edit</button>
                <button v-if="isAdmin" class="btn pmd-btn-flat pmd-ripple-effect btn-danger" @click="deleteEvent"
                    type="button">Delete</button>
                <p v-if="hasUserBoughtTIcket" class="fw-bold">You have already bought ticket for this event!</p>
            </div>
            <div>

            </div>
        </div>
    </div>
</template>


<script setup>
/*
   imports
*/
import { eventStore } from '@/store/events/eventStore.js';
import { authStore } from '@/store/auth/authStore.js';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

/*
   router
*/

const router = useRouter();

/*
   event store
*/
const store = eventStore();

/*
   users store
*/
const users = authStore();

const isAdmin = computed(() => users.isCurrentUserAdmin);


/*
   handle delete event
*/

const deleteEvent = async () => {
    const isConfirmed = confirm(`Are you sure you want to delete ${store.currentEvent.name}`)

    if(isConfirmed) {
        await store.deleteEvent(store.currentEvent.id);
    }else {
        return
    }

    router.push({ name: 'Event-Catalog' })
}


/*
   handle edit event
*/

const editEvent = () => {
    store.editedEvent = store.currentEvent

    store.isEditing = true;
}


/*
   handle buy ticket
*/

const handleBuyTicket = () => {
    store.handleBuyTicket(users.currentUser, store.currentEvent);
}


/*
    has user bought ticket
*/

const hasUserBoughtTIcket = computed(() => users.currentUser ? store.hasUserBoughTicket(users.currentUser.email) : null)

/*
   handle add expense
*/

const openAddExpense = () => {
    store.isAddExpense = true
}

</script>


<style scoped lang="scss">
.card-footer {
    gap: 1rem;
}
</style>