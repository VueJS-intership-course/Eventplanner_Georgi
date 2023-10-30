<template>
    <div class="back-modal" @click.self="store.closeModal" >
        <div class="add-modal container py-3 d-flex flex-column">
            <div class="card shadow rounded-3 my-auto">
                <div class="card-header p-3 h4">
                    Add Event
                </div>
                <div class="card-body p-4">
                    <Form @submit="editEvent" :validation-schema="schema" role="form" class="row">
                        <div class="form-group col-lg-4 ">
                            <label class="form-control-label" for="form-group-input">Name</label>
                            <Field type="text" class="form-control" id="form-group-input" :value="store.editedEvent.name" name="name" />
                            <ErrorMessage name="name" />
                        </div>
                        <div class="form-group col-lg-4 ">
                            <label class="form-control-label" for="form-group-input">Tickets</label>
                            <Field type="number" class="form-control" id="form-group-input" :value="store.editedEvent.ticket" name="ticket" />
                            <ErrorMessage name="tickets" />
                        </div>
                        <div class="form-group col-lg-4 mb-3">
                            <label class="form-control-label" for="form-group-input">Price</label>
                            <Field type="number" class="form-control" id="form-group-input" :value="store.editedEvent.price" name="price" />
                            <ErrorMessage name="price" />
                        </div>
                        <div class="form-group col-lg-12 mb-3">
                            <label class="form-control-label" for="form-group-input">Date</label>
                            <Field type="date" class="form-control" id="form-group-input" :value="store.editedEvent.date" name="date" />
                            <ErrorMessage name="date" />
                        </div>
                        <div class="form-group col-lg-12 mb-3">
                            <label class="form-control-label" for="form-group-input">Time</label>
                            <Field type="time" class="form-control" id="form-group-input" :value="store.editedEvent.time" name="time" />
                            <ErrorMessage name="time" />
                        </div>
                        <div class="form-group col-lg-6">
                            <label class="form-control-label" for="form-group-input">Longtitude</label>
                            <Field type="number" placeholder="longtitude" class="form-control" :value="store.editedEvent.location[0]" id="form-group-input"
                                name="longtitude" />
                            <ErrorMessage name="longtitude" />
                        </div>
                        <div class="form-group col-lg-6 mb-3">
                            <label class="form-control-label" for="form-group-input">Latitude</label>
                            <Field type="number" placeholder="latitude" class="form-control" :value="store.editedEvent.location[1]" id="form-group-input"
                                name="latitude" />
                            <ErrorMessage name="latitude" />
                        </div>
                        <div class="form-group col-lg-6">
                            <button class="btn btn-primary float-end mt-4" for="form-group-input">Edit Event</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
/*
   imports
*/

import { eventStore } from '@/store/events/eventStore.js';
import { Form, Field, ErrorMessage } from 'vee-validate';
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


const errorMsg = ref('')

const editEvent = (values) => {
    try {
        console.log(values);
        console.log(store.editedEvent.id);
        const event = {
            id:store.editedEvent.id,
            name: values.name,
            ticket: values.ticket,
            price: values.price,
            date: values.date,
            time: values.time,
            location: [values.longtitude, values.latitude],
            imgSrc: store.editedEvent.imgSrc,
        }

        store.editEvent(event);
        store.closeModal();

    } catch (error) {
        errorMsg.value = error;
    }
}

</script>


<style scoped lang="scss">
.back-modal {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(77, 77, 77, 0.452);
    z-index: 3;

    .add-modal {
        position: absolute;
        top: 20%;
        left: 10%;
    }
}</style>