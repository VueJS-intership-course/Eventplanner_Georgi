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
   props
*/

const props = defineProps({
    eventData: {
        type: Object,
        required: true
    }
});

console.log(props.eventData);
</script>


<style scoped lang="scss">
.card {
    border-radius: 7%;
}
</style>