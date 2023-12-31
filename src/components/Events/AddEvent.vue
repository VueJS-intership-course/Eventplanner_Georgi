<template>
    <TheModal @click.self="store.closeAdd">
        <div class="card shadow rounded-1 my-auto">
            <div class="card-header p-1 h4">
                Add Event
            </div>
            <div class="card-body">
                <ErrorModal @close-error="closeError" v-if="errorMsg" :errorMsg="errorMsg"></ErrorModal>
                <form @submit="addEvent" role="form" class="row">
                    <div class="form-group col-lg-4 ">
                        <BasicInput type="text" placeholder="enter event name" name="name" label="Name" />
                    </div>
                    <div class="form-group col-lg-4 ">
                        <BasicInput type="number" placeholder="enter tickets amount" name="tickets" label="Tickets" />
                    </div>
                    <div class="form-group col-lg-4">
                        <BasicInput type="number" placeholder="enter ticket price" name="price" label="Price" />
                    </div>
                    <div class="form-group col-lg-12 ">
                        <BasicInput type="date" name="date" label="Date" />
                    </div>
                    <div class="form-group col-lg-12 ">
                        <BasicInput type="time" name="time" label="Time" />
                    </div>
                    <div class="form-group col-lg-12">
                        <BasicInput type="file" name="imgSrc" label="Image" />
                    </div>
                    <div class="form-group col-lg-12">
                        <BasicInput type="number" placeholder="enter event budget" name="budget" label="Budget" />
                    </div>
                    <div class="col-lg-12 mb-4">
                        <label class="form-control-label">Choose location</label>
                        <div class="mb-4">
                            <input type="text" v-model="location[1]" readonly> <input type="text" v-model="location[0]"
                                readonly>
                        </div>
                        <MapComp :is-small="true" @map-ready="mapReady" />
                    </div>
                    <div class="form-group col-lg-6">
                        <button class="btn btn-primary float-end mt-4" for="form-group-input">Add Event</button>
                    </div>
                </form>
            </div>
        </div>
    </TheModal>
</template>


<script setup>
/*
   imports
*/

import { eventStore } from '@/store/events/eventStore.js';
import { toLonLat } from "ol/proj";
import { useForm } from 'vee-validate';
import MapComp from '@/components/Map/MapComp.vue'
import * as yup from 'yup';
import { ref } from 'vue';
import mapLayers from '@/utils/mapLayers.js';
import showNotifications from '@/utils/notifications.js';
import tzlookup from 'tz-lookup';
import moment from 'moment-timezone';


/*
  error handling
*/


const { handleSubmit } = useForm({
    validationSchema: yup.object({
        name: yup.string().trim().required("This field is required!"),
        tickets: yup
            .number()
            .typeError('Tickets must be a number')
            .required("This field is required!")
            .min(20, 'Minimum 20 tickets should be available'),
        price: yup
            .number()
            .typeError('Price must be a number')
            .required("This field is required!"),
        date: yup
            .date()
            .test('date', 'Selected date must be later than today', function (value) {
                const today = new Date();
                return value && value >= today;
            }),
        time: yup
            .string()
            .required('This field is required'),
        budget: yup
            .number()
            .required('This field is required')
            .min(5000, 'Minimum 5000 for events budget'),
        imgSrc: yup.string().required('Image is required'),
    })
})


/*
   event store
*/

const store = eventStore();

/*
    adding event
*/

const errorMsg = ref(null);

/*
   map-handling
*/

const location = ref([]);
const layer = ref(null);

const mapReady = (map) => {
    map.on('click', (e) => {
        location.value = toLonLat(e.coordinate);
        map.removeLayer(layer.value)
        layer.value = mapLayers.createLayerOnClick(location.value);
        map.addLayer(layer.value)
    })
}

/*
   handle add new Event
*/

const addEvent = handleSubmit((values) => {
    try {

        const newEvent = {
            name: values.name,
            ticket: values.tickets,
            price: values.price,
            dateTime: moment.tz(`${values.date}T${values.time}`, tzlookup(location.value[1], location.value[0])).utc().toISOString(),
            location: location.value,
            offset: moment.tz.zone(tzlookup(location.value[1], location.value[0])).utcOffset(moment.tz(`${values.date}T${values.time}`, tzlookup(location.value[1], location.value[0]))) / 60,
            budget: values.budget,
            date: values.date,
            time: values.time,
            imgSrc: values.imgSrc
        }

        console.log(newEvent, values.imgSrc);
        const isConfirmed = confirm(`Are you sure you want to add ${values.name}?`)

        if (isConfirmed) {
            store.addEvent(newEvent);
            showNotifications(`${newEvent.name} is added to the catalog!`);
            store.closeAdd();
        }


    } catch (error) {
        errorMsg.value = error.message;
    }
})
</script>


<style scoped lang="scss"></style>