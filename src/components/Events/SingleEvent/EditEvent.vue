<template>
    <div>
        <ErrorModal @close-error="closeError" v-if="errorMsg" :errorMsg="errorMsg"></ErrorModal>
        <TheModal @click.self="store.closeModal">
            <div class="card shadow rounded-3 my-auto">
                <div class="card-header p-3 h4">
                    Add Event
                </div>
                <div class="card-body p-4">
                    <Form @submit="editEvent" :validation-schema="schema" role="form" class="row">
                        <div class="form-group col-lg-4 ">
                            <label class="form-control-label" for="form-group-input">Name</label>
                            <Field type="text" class="form-control" id="form-group-input" :value="store.editedEvent.name"
                                name="name" />
                            <ErrorMessage name="name" />
                        </div>
                        <div class="form-group col-lg-4 ">
                            <label class="form-control-label" for="form-group-input">Tickets</label>
                            <Field type="number" class="form-control" id="form-group-input"
                                :value="store.editedEvent.ticket" name="ticket" />
                            <ErrorMessage name="tickets" />
                        </div>
                        <div class="form-group col-lg-4 mb-3">
                            <label class="form-control-label" for="form-group-input">Price</label>
                            <Field type="number" class="form-control" id="form-group-input" :value="store.editedEvent.price"
                                name="price" />
                            <ErrorMessage name="price" />
                        </div>
                        <div class="form-group col-lg-12 mb-3">
                            <label class="form-control-label" for="form-group-input">Date</label>
                            <Field type="date" class="form-control" id="form-group-input" :value="store.editedEvent.date"
                                name="date" />
                            <ErrorMessage name="date" />
                        </div>
                        <div class="form-group col-lg-12 mb-3">
                            <label class="form-control-label" for="form-group-input">Time</label>
                            <Field type="time" class="form-control" id="form-group-input" :value="store.editedEvent.time"
                                name="time" />
                            <ErrorMessage name="time" />
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
                            <button class="btn btn-primary float-end mt-4" for="form-group-input">Edit Event</button>
                        </div>
                    </Form>
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
import { Form, Field, ErrorMessage } from 'vee-validate';
import showNotifications from '@/utils/notifications.js'
import { toLonLat } from 'ol/proj';
import mapLayers from '@/utils/mapLayers.js';
import MapComp from '@/components/Map/MapComp.vue';
import * as yup from 'yup';
import { ref } from 'vue';


/*
  error handling
*/


const schema = yup.object({
    name: yup.string().required("This field is required!"),
    ticket: yup
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
    longtitude: yup
        .number()
        .required('This field is required'),
    latitude: yup
        .number()
        .required('This field is required'),

})



/*
   event store
*/

const store = eventStore();


/*
    adding event
*/


const errorMsg = ref(null);
const location = ref([store.editedEvent.location[0], store.editedEvent.location[1]]);
const layer = ref(null)

const editEvent = (values) => {
    try {

        const event = {
            id: store.editedEvent.id,
            name: values.name,
            ticket: values.ticket,
            price: values.price,
            date: values.date,
            time: values.time,
            location: [values.longtitude, values.latitude],
            imgSrc: store.editedEvent.imgSrc,
            dateTime: new Date(values.date + 'T' + values.time + 'Z').toISOString(),
        }

        store.editEvent(event);
        store.closeModal();

        showNotifications(`${event.name} is edited successfully!`)
    } catch (error) {
        errorMsg.value = error;
    }
}

/*
   map handling
*/

const mapReady = (map) => {
    map.on('click', (e) => {
        location.value = toLonLat(e.coordinate);
        map.removeLayer(layer.value)
        layer.value = mapLayers.createLayerOnClick(location.value);
        map.addLayer(layer.value)
    })
}


/*
   close error modal
*/

const closeError = () => {
    errorMsg.value = null
}

</script>


<style scoped lang="scss">
@import '../../../styles/variables.scss';

span {
    color: $form-wrong-input;
}
</style>