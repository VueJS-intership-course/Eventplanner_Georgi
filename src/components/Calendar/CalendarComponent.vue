<template>
    <div class="calendar bg-light">
        <h2 class="text-center fw-bold text-primary">{{ props.title }}</h2>
        <FullCalendar :options='calendarOptions' />
    </div>
</template>

<script setup>
/*
   imports
*/
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { ref } from 'vue';

/*
   emits
*/
const emits = defineEmits(['date-click'])

/*
   props
*/
const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    title: {
        type: String,
    }
})


/*
   options
*/
const calendarOptions = ref({
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: props.data,
    selectable: true,
})

</script>

<style scoped lang="scss">
.calendar {
    width: 60%;
    height: 400px;
    overflow: auto;

}</style>
