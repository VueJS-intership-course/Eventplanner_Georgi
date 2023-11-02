<template>
    <div>
        <ErrorModal @close-error="closeError" v-if="errorMsg" :errorMsg="errorMsg"></ErrorModal>
        <div class="container d-flex flex-column jusitfy-content-center align-items-center">
            <Form @submit.self="signUp" :validation-schema="schema"
                class="d-flex flex-column align-items-center justify-content-center">
                <h1 class="text-light mb-4">Sign Up</h1>
                <div class="mb-3">
                    <label for="email" class="form-label text-light">Email address</label>
                    <Field type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp" />
                    <ErrorMessage name="email" />
                </div>
                <div class="mb-3">
                    <label for="username" class="form-label text-light">Username</label>
                    <Field type="text" name="username" class="form-control" id="username" />
                    <ErrorMessage name="username" />
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label text-light">Password</label>
                    <Field type="password" name="password" class="form-control" id="password" />
                    <ErrorMessage name="password" />
                </div>
                <div class="mb-3">
                    <label for="rePass" class="form-label text-light">Repeat Password</label>
                    <Field type="password" name="rePass" class="form-control" id="rePass" />
                    <ErrorMessage name="rePass" />
                </div>
                <div class="mb-3">
                    <label for="country" class="form-label text-light">Country</label>
                    <Field type="text" name="country" class="form-control" id="country" />
                    <ErrorMessage name="country" />
                </div>
                <div class="mb-4">
                    <label for="time-zone" class="form-label text-light">Time zone</label>
                    <auto-complete v-model="timeZoneSelcted" :data="constants.allTimeZones"></auto-complete>
                </div>
                <div class="controls">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </Form>
        </div>
    </div>
</template>

<script setup>
/*
   imports
*/
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import constants from '@/utils/constants.js';
import AutoComplete from '@/common-templates/AutoComplete.vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup'
import { authStore } from '@/store/auth/authStore.js';

/*
   router
*/


const router = useRouter();


/*
    store
*/

const store = authStore();

/*
   Sign Up
*/

const schema = yup.object({
    email: yup.string().email("Enter a valid email!").required("This field is required!"),
    username: yup
        .string()
        .required("This field is required!")
        .min(4, "Username must be at least 4 symbols!"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 symbols!")
        .required("This field is required!"),
    rePass: yup
        .string()
        .required("This field is required!")
        .oneOf([yup.ref("password")], "Passwords does not match!"),
    country: yup.
        string()
        .required('This field is required!')
})

const timeZoneSelcted = ref('')

const signUp = async (values) => {

    try {
        const userInfo = {
            email: values.email,
            username: values.username,
            password: values.password,
            timeZone: timeZoneSelcted.value,
        };


        await store.signUp(userInfo)

        router.push({ name: 'Event-Catalog' });
    } catch (error) {
        errorMsg.value = error.message;
    }
};



/*
   close error modal
*/

const closeError = () => {
    errorMsg.value = null
}


</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

form {
    @include form-auth
}
</style>