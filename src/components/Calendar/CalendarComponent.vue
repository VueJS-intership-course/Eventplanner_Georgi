<template>
    <div class="calendar bg-light">
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
   handle calendar and date events
*/
const handleDateClick = (arg) => {
    const clickedDate = arg.dateStr;
    const eventsForDate = props.data.filter(event => event.start === clickedDate);
    if (eventsForDate.length > 0) {
        emits('date-click', eventsForDate[0])
    } else {
        return
    }
};


const calendarOptions = ref({
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    events: props.data,
    dateClick:handleDateClick
})

</script>

<style scoped lang="scss">
.calendar {
    width: 60%;
    height: 400px;


    .fc-media-screen {
        height: 100%;
        padding: 0.2rem;
    }
}
</style>
