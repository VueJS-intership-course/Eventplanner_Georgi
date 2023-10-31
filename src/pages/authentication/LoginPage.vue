<template>
    <div class="container d-flex flex-column jusitfy-content-center align-items-center">
        <Form @submit="signIn" :validation-schema="schema"
            class="d-flex flex-column align-items-center justify-content-center">
            <h1 class="text-light mb-4">Sign In</h1>

            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label text-light">Email address</label>
                <Field type="email" name="email" class="form-control" />
                <ErrorMessage name="email" />
            </div>
            <div class="mb-3">
                <label for="password" class="form-label text-light">Password</label>
                <Field type="password" name="password" class="form-control" />
                <ErrorMessage name="password" />
            </div>
            <div class="controls">
                <button type="submit" class="btn btn-primary mb-4">Submit</button>
            </div>

            <div class="text-center text-light">
                <p>Not a member? <router-link :to="{ name: 'SignUp-Page' }">Sign Up</router-link></p>
                <p>or sign up with:</p>
                <button @click="signInGoogle" type="button" class="btn btn-danger btn-floating mx-1">
                    <i class="bi bi-google"></i>
                </button>
                <button @click="signInFacebook" type="button" class="btn btn-primary btn-floating mx-1">
                    <i class="bi bi-facebook"></i>
                </button>
            </div>
        </Form>
    </div>
</template>

<script setup>
/*
   imports
*/

import { ref } from 'vue';
import authServices from '@/services/authServices/authServices.js';
import { useRouter } from 'vue-router';
import { Form, ErrorMessage, Field } from 'vee-validate';
import * as yup from 'yup';
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
   validation
*/

const errorMsg = ref('');

const schema = yup.object({
    email: yup.string().email("Enter a valid email!").required("This field is required!"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 symbols!")
        .required("This field is required!"),
});


/*
   Sing In with email
*/


const signIn = async (values) => {
    try {
        await store.signIn(values.email, values.password);

        router.push({ name: 'Event-Catalog' });
    } catch (error) {
        errorMsg.value = error.message
    }
}

/*
   Sing in with google
*/

const signInGoogle = async () => {
    try {
        await store.signInWithGoogle();

        router.push({ name: 'Event-Catalog' });
    } catch (error) {
        errorMsg.value = error.message
    }
}

/*
   Sign In with facebook
*/

const signInFacebook = async () => {
    try {
        await store.signInWithFacebook();

        router.push({ name: 'Event-Catalog' });
    } catch (error) {
        errorMsg.value = error.message
    }
}

</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

form {
    @include form-auth;
}
</style>