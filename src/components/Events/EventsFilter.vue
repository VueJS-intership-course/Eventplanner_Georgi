<template>
    <div class="wrapper" @click.self="$emit('close-filter')">
        <form @submit.prevent="handleFilters" class="filterer d-flex flex-column bg-light p-4">
            <div class="header mb-3 text-center">
                <h3 class="fw-bold">Filter</h3>
            </div>

            <div class="d-flex flex-column mb-3">
                <label>Date:</label>
                <div class="byDate">
                    <input type="date" id="startDate" v-model="startDate"/>
                    <input type="date" id="endDate" v-model="endDate"/>
                </div>
            </div>

            <div class="Location mb-3 d-flex flex-column">
                <label>Location:</label>
                <input placeholder="Location" v-model="location"/>
            </div>

            <div class="ticket mb-3 d-flex flex-column">
                <label>Ticket</label>
                <select v-model="ticketStatus">
                    <option value="all">All</option>
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                </select>
            </div>

            <button type="submit" class="btn btn-outline-primary">Submit</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {eventStore} from '../../store/events/eventStore';

/*
   filter logic
*/

const emits = defineEmits(['close-filter'])

const startDate = ref(null);
const endDate = ref('');
const location = ref('');
const ticketStatus = ref('');

const store = eventStore()


const handleFilters = () => {
    store.filterQuery.startDate = startDate.value;
    store.filterQuery.endDate = endDate.value;
    store.filterQuery.location = location.value;
    store.filterQuery.ticketStatus = ticketStatus.value;
    emits('close-filter')
}

</script>


<style scoped lang="scss">
.wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(59, 59, 59, 0.534);
    z-index: 10;

    .filterer {
        position: absolute;
        left: 40%;
        top: 40%;
    }
}
</style>