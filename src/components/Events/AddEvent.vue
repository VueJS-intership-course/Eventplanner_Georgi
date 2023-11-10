<template>
    <div>
        <ErrorModal @close-error="closeError" v-if="errorMsg" :errorMsg="errorMsg"></ErrorModal>
        <TheModal @click.self="store.closeAdd">
            <div class="card shadow rounded-2 my-auto">
                <div class="card-header p-1 h4">
                    Add Event
                </div>
                <div class="card-body p-">
                    <form @submit="addEvent" role="form" class="row">
                        <div class="form-group col-lg-4 ">
                            <BasicInput type="text" name="name" label="Name" />
                        </div>
                        <div class="form-group col-lg-4 ">
                            <BasicInput type="number" name="tickets" label="Tickets" />
                        </div>
                        <div class="form-group col-lg-4">
                            <BasicInput type="number" name="price" label="Price" />
                        </div>
                        <div class="form-group col-lg-12 ">
                            <BasicInput type="date" name="date" label="Date" />
                        </div>
                        <div class="form-group col-lg-12 ">
                            <BasicInput type="time" name="time" label="Time" />
                        </div>
                        <div class="form-group col-lg-12">
                            <label class="form-control-label" for="form-group-input">Image</label>
                            <input @change="handleEventImage" type="file" class="form-control" id="form-group-input"
                                name="imgSrc" />
                        </div>
                        <div class="form-group col-lg-12">
                            <BasicInput type="number" name="budget" label="Budget" />
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
    </div>
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
import showNotifications from '@/utils/notifications.js'


/*
  error handling
*/


const { handleSubmit } = useForm({
    validationSchema: yup.object({
        name: yup.string().required("This field is required!"),
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
            .string()
            .required('This field is required'),
    })
})


/*
   event store
*/

const store = eventStore();

/*
    adding event
*/

const img = ref(null);
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
            dateTime: new Date(values.date + 'T' + values.time + 'Z').toISOString(),
            location: location.value,
            budget: values.budget,
            date: values.date,
            time: values.time
        }

        const isConfirmed = confirm(`Are you sure you want to add ${values.name}?`)

        if (isConfirmed) {
            store.addEvent(newEvent, img.value);

            showNotifications(`${newEvent.name} is added to the catalog!`);
        }

        store.closeAdd();

    } catch (error) {
        errorMsg.value = error.message;

        store.closeAdd()
    }
})

const handleEventImage = (event) => {
    const file = event.target.files[0];
    if (file) {
        img.value = file;
    }
};


</script>


<style scoped lang="scss">
span {
    color: red;
    font-size: smaller;
}
</style>