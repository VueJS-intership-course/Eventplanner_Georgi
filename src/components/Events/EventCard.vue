<template>
    <div class="card bg-dark text-light text-center rounded-4 p-2 pb-0 shadow border-0" style="width: 18rem;">
        <img :src="eventData.imgSrc" height="250" class="rounded-4" alt="...">
        <div class="card-body">
            <h4 class="card-title fw-bold">{{ eventData.name }}</h4>
            <div class="mb-3">
                <time :datetime="`${eventData.date} ${eventData.time}`">
                    <i class="bi bi-calendar-date"></i> {{ eventData.date }} / <i class="bi bi-clock"></i> {{ eventData.time
                    }}
                </time>
            </div>
            <ul class="list-group bg-dark mb-3">
                <li class="list-group-item bg-dark text-light text-center">Tickets available: {{ eventData.ticket }}</li>
                <li class="list-group-item bg-dark text-light text-center">Price per ticket: {{ eventData.price }}$</li>
            </ul>
            <div class="controls">
                <button class="btn btn-primary">See details</button>
            </div>
        </div>
    </div>
</template>


<script setup>
/*
   imports
*/
import { authStore } from '../../store/auth/authStore';
import moment from 'moment-timezone';
import tzlookup from 'tz-lookup'
import { computed, watch } from 'vue';

/*
   users store
*/

const store = authStore();

/*
   props
*/

const props = defineProps({
    eventData: {
        type: Object,
        required: true
    }
});



const eventTimeZone = tzlookup(props.eventData.location[0], props.eventData.location[1])


const originalTime = moment.tz(`${props.eventData.date} ${props.eventData.time}`, eventTimeZone);

const isUserEmpty = computed(() => store.currentUser !== null);

watch(() => isUserEmpty, () => {
    const targetTime = originalTime.tz(store.currentUser.timeZone).format();

    console.log(targetTime)
})

</script>


<style scoped lang="scss">
.card {
    border-radius: 7%;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>