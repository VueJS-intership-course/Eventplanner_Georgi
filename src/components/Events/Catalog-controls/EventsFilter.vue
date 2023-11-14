<template>
    <TheModal @click.self="store.closeFilter">
        <form @submit.prevent="handleFilters" class="filterer d-flex flex-column bg-light p-4">
            <div class="header mb-3 text-center">
                <h3 class="fw-bold">Filter</h3>
            </div>

            <div class="d-flex flex-column mb-3">
                <label>Date:</label>
                <div class="byDate">
                    <input type="date" id="startDate" name="startDate" v-model="startDate"/>
                    <input type="date" id="endDate" name="endDate" v-model="endDate"/>
                </div>
            </div>

            <div class="Location mb-3 d-flex flex-column">
                <label>Location:</label>
                <input placeholder="Location" name="location" v-model="location"/>
            </div>

            <div class="ticket mb-3 d-flex flex-column">
                <label>Ticket</label>
                <select v-model="ticketStatus" name="ticketStatus">
                    <option value="all">All</option>
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                </select>
            </div>

            <button type="submit" class="btn btn-outline-primary">Submit</button>
        </form>
    </TheModal>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { eventStore } from '@/store/events/eventStore.js';
import { useRoute, useRouter } from 'vue-router';

const store = eventStore();
const router = useRouter();
const route = useRoute();

const startDate = ref(null);
const endDate = ref('');
const location = ref('');
const ticketStatus = ref('');

const handleFilters = () => {
    const queryParameters = {};

    if (startDate.value) {
        queryParameters.startDate = startDate.value;
    }

    if (endDate.value) {
        queryParameters.endDate = endDate.value;
    }

    if (location.value) {
        queryParameters.location = location.value;
    }

    if (ticketStatus.value) {
        queryParameters.ticketStatus = ticketStatus.value;
    }

    store.closeFilter();
    router.push({ query: queryParameters });
};

onBeforeMount(() => {
    const query = route.query;

    startDate.value = query.startDate || null;
    endDate.value = query.endDate || '';
    location.value = query.location || '';
    ticketStatus.value = query.ticketStatus || '';
});
</script>




<style scoped lang="scss">
    .filterer {
        position: absolute !important;
        left: 40%;
        width: fit-content !important;
        top: 60%;
    }
</style>