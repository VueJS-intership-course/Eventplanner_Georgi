<template>
    <div>
        <ErrorModal @close-error="closeError" v-if="errorMsg" :erorrMsg="errorMsg"/>
        <div v-if="store.currentEvent" class="container d-flex mt-4 p-4 bg-light ">
            <div class="pmd-card-media p-3">
                <img :src="store.currentEvent.imgSrc" width="600" height="500" class="img-fluid">
            </div>
            <div>
                <div class="card-header mb-4">
                    <h2 class="card-title">{{ store.currentEvent.name }}</h2>
                    <p class="card-subtitle">{{ $formatDateInTimeZone(store.currentEvent.location,
                        store.currentEvent.dateTime)
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
                    <li class="list-group-item d-flex flex-row" v-if="hasTicketsAvailable">
                        <span class="media-body">Tickets available: {{ store.currentEvent.ticket }}</span>
                    </li>
                    <li class="list-group-item d-flex flex-row" v-if="hasTicketsAvailable">
                        <div class="media-body">Ticket price: {{ store.currentEvent.price }}$</div>
                    </li>
                    <li class="list-group-item d-flex flex-row" v-if="!hasTicketsAvailable">
                        <div class="media-body fw-bold text-danger">SOLD OUT!</div>
                    </li>
                    <li v-if="isAdmin" class="list-group-item d-flex flex-row">
                        <div class="media-body">Budget: {{ store.currentEvent.budget }}$</div>
                    </li>
                </ul>
                <div class="card-footer d-flex p-3">
                    <div v-if="!isAdmin && users.currentUser && !hasUserBoughtTIcket && hasTicketsAvailable">
                        <button type="button" class="btn pmd-btn-flat pmd-ripple-effect btn-primary"
                            @click="handleBuyTicket">Buy
                            Ticket</button>
                    </div>
                    <div v-if="isAdmin" class="admin-controls d-flex ">
                        <div>
                            <router-link class="btn pmd-btn-flat pmd-ripple-effect btn-primary"
                                :to="{ name: 'Event-Analytics', params: { id: store.currentEvent.id } }"
                                type="button">Analytics</router-link>
                        </div>
                        <div>
                            <button class="btn pmd-btn-flat pmd-ripple-effect btn-primary" type="button"
                                @click="openAddExpense">Add
                                Expense</button>
                        </div>
                        <div>
                            <button class="btn pmd-btn-flat pmd-ripple-effect btn-primary" @click="editEvent"
                                type="button">Edit</button>
                        </div>
                        <div>
                            <button class="btn pmd-btn-flat pmd-ripple-effect btn-danger" @click="deleteEvent"
                                type="button">Delete</button>
                        </div>
                    </div>
                    <div>
                        <p v-if="hasUserBoughtTIcket" class="fw-bold">You have already bought ticket for this event!</p>
                    </div>
                </div>
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
import { computed, ref } from 'vue';
import showNotifications from '@/utils/notifications.js'

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
   error message
*/
const errorMsg = ref(null);

/*
   handle delete event
*/


const deleteEvent = async () => {
    try {
        const isConfirmed = confirm(`Are you sure you want to delete ${store.currentEvent.name}`)

        if (isConfirmed) {
            await store.deleteEvent(store.currentEvent.id);
        } else {
            return
        }

        router.push({ name: 'Event-Catalog' })

    } catch (error) {
        errorMsg.value = error.message;
    }
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

const handleBuyTicket = async () => {
    try {
        const isConfirmed = confirm(`Are you sure you want to buy ticket for ${store.currentEvent.name}`)
        if (isConfirmed) {
            await store.handleBuyTicket(users.currentUser, store.currentEvent);

            showNotifications(`Successfuly bought ticket for ${store.currentEvent.name}`)
        } else {
            return;
        }
    } catch (error) {
        errorMsg.value = error.message;
    }
}


/*
    has user bought ticket
*/

const hasUserBoughtTIcket = computed(() => users.currentUser ? store.hasUserBoughTicket(users.currentUser.email) : null)

/*
   has available tickets
*/

const hasTicketsAvailable = computed(() => store.currentEvent.ticket > 0);

/*
   handle add expense
*/

const openAddExpense = () => {
    store.isAddExpense = true
}


/*
   handle close error modal
*/
const closeError = () => {
    errorMsg.value = null;
}

</script>


<style scoped lang="scss">
.card-footer {
    gap: 1rem;

    .admin-controls {
        gap: 0.8rem;

        div:not(:last-child) {
            padding-right: 0.5rem;
            border-right: 1px solid black;
        }
    }
}
</style>