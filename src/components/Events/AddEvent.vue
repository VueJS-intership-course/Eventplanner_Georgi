<template>
    <ErrorModal v-if="errorMsg" :errorMsg="errorMsg"></ErrorModal>
    <TheModal @click.self="store.closeAdd">
        <div class="card shadow rounded-2 my-auto">
            <div class="card-header p-1 h4">
                Add Event
            </div>
            <div class="card-body p-">
                <Form @submit="addEvent" :validation-schema="schema" role="form" class="row">
                    <div class="form-group col-lg-4 ">
                        <label class="form-control-label" for="form-group-input">Name</label>
                        <Field type="text" class="form-control" id="form-group-input" name="name" />
                        <ErrorMessage name="name" />
                    </div>
                    <div class="form-group col-lg-4 ">
                        <label class="form-control-label" for="form-group-input">Tickets</label>
                        <Field type="number" class="form-control" id="form-group-input" name="tickets" />
                        <ErrorMessage name="tickets" />
                    </div>
                    <div class="form-group col-lg-4">
                        <label class="form-control-label" for="form-group-input">Price</label>
                        <Field type="number" class="form-control" id="form-group-input" name="price" />
                        <ErrorMessage name="price" />
                    </div>
                    <div class="form-group col-lg-12 ">
                        <label class="form-control-label" for="form-group-input">Date</label>
                        <Field type="date" class="form-control" id="form-group-input" name="date" />
                        <ErrorMessage name="date" />
                    </div>
                    <div class="form-group col-lg-12 ">
                        <label class="form-control-label" for="form-group-input">Time</label>
                        <Field type="time" class="form-control" id="form-group-input" name="time" />
                        <ErrorMessage name="time" />
                    </div>
                    <div class="form-group col-lg-12">
                        <label class="form-control-label" for="form-group-input">Image</label>
                        <input @change="handleEventImage" type="file" class="form-control" id="form-group-input"
                            name="imgSrc" />
                    </div>
                    <div class="form-group col-lg-12">
                        <label class="form-control-label" for="form-group-input">Budget</label>
                        <Field type="number" class="form-control" id="form-group-input" name="budget" />
                        <ErrorMessage name="budget" />
                    </div>
                    <div class="col-lg-12 mb-4">
                        <label class="form-control-label">Choose location</label>
                        <div class="mb-4">
                            <input type="text" v-model="location[1]" readonly> <input type="text" v-model="location[0]"
                                readonly>
                        </div>
                        <MapComp :is-small="true" @map-ready="mapReady" />
                    </div>
                    <div class="form-group col-lg-12">
                        <label class="form-control-label" for="form-group-input">Country</label>
                        <Field type="text" class="form-control" id="form-group-input" name="country" />
                        <ErrorMessage name="country" />
                    </div>

                    <div class="form-group col-lg-6">
                        <button class="btn btn-primary float-end mt-4" for="form-group-input">Add Event</button>
                    </div>
                </Form>
            </div>
        </div>
    </TheModal>
</template>


<script setup>
/*
   imports
*/

import { eventStore } from '@/store/events/eventStore.js';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toLonLat } from "ol/proj";
import MapComp from '../Map/MapComp.vue'
import * as yup from 'yup';
import { ref } from 'vue';
import mapLayers from '../../utils/mapLayers.js'


/*
  error handling
*/


const schema = yup.object({
    name: yup.string().required("This field is required!"),
    tickets: yup
        .number()
        .required("This field is required!")
        .min(20, 'Minimum 20 tickets should be available'),
    price: yup
        .number()
        .required("This field is required!"),
    date: yup
        .string()
        .required("This field is required!"),
    time: yup
        .string()
        .required('This field is required'),

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

const addEvent = (values) => {
    try {
        const newEvent = {
            name: values.name,
            ticket: values.tickets,
            price: values.price,
            date: values.date,
            time: values.time,
            location: location.value,
            budget: values.budget,
            country: values.country
        }

        store.addEvent(newEvent, img.value);

        store.closeAdd()

    } catch (error) {
        errorMsg.value = error.message;

        store.closeAdd()
    }
}

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