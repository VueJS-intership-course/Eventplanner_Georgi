<template>
    <TheModal @click.self="store.closeModal">
        <div class="card shadow rounded-3 my-auto">
            <div class="card-header p-3 h4">
                Edit Event
            </div>
            <div class="card-body p-4">
                <ErrorModal @close-error="closeError" v-if="errorMsg" :errorMsg="errorMsg"></ErrorModal>
                <form @submit="editEvent" role="form" class="row">
                    <div class="form-group col-lg-4 ">
                        <BasicInput type="text" :value="store.editedEvent.name" label="Name" name="name" />
                    </div>
                    <div class="form-group col-lg-4 ">
                        <BasicInput type="text" :value="store.editedEvent.ticket" name="ticket" label="Tickets"
                            placeholder="Enter tickets amount" />
                    </div>
                    <div class="form-group col-lg-4 mb-3">
                        <BasicInput type="number" :value="store.editedEvent.price" name="price" label="Price" />
                    </div>
                    <div class="form-group col-lg-12 mb-3">
                        <BasicInput type="date" :value="store.editedEvent.date" name="date" label="Date" />
                    </div>
                    <div class="form-group col-lg-12 mb-3">
                        <BasicInput type="time" :value="store.editedEvent.time" name="time" label="Time" />
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
import { useForm } from 'vee-validate';
import showNotifications from '@/utils/notifications.js'
import { toLonLat } from 'ol/proj';
import mapLayers from '@/utils/mapLayers.js';
import MapComp from '@/components/Map/MapComp.vue';
import * as yup from 'yup';
import { ref } from 'vue';
import tzlookup from 'tz-lookup';
import moment from 'moment-timezone';


/*
  error handling
*/


const { handleSubmit } = useForm({
    validationSchema: yup.object({
        name: yup.string().trim().required("This field is required!"),
        ticket: yup
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
const location = ref([store.editedEvent.location[0], store.editedEvent.location[1]]);
const layer = ref(null)

const editEvent = handleSubmit(async (values) => {
    try {

        const event = {
            id: store.editedEvent.id,
            name: values.name,
            ticket: values.ticket,
            price: values.price,
            date: values.date,
            time: values.time,
            location: location.value,
            dateTime: moment.tz(`${values.date}T${values.time}`, tzlookup(location.value[1], location.value[0])).utc().toISOString(),
        }

        const isConfirmed = confirm('Are you sure you want to change this event?');

        if (isConfirmed) {
            store.editEvent(event);
            showNotifications(`${event.name} is edited successfully!`);
            store.closeModal();
        }


    } catch (error) {
        errorMsg.value = error.message;
    }

})

/*
   map handling
*/

const mapReady = (map) => {
    layer.value = mapLayers.createSingleLayer(store.editedEvent);
    map.addLayer(layer.value);

    map.on('click', (e) => {
        location.value = toLonLat(e.coordinate);
        map.removeLayer(layer.value);
        layer.value = mapLayers.createLayerOnClick(location.value);
        map.addLayer(layer.value);
    });
}


/*
   close error modal
*/

const closeError = () => {
    errorMsg.value = null
}

</script>


<style scoped lang="scss"></style>