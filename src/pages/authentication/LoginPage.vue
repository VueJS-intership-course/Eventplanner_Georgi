<template>
    <div>
        <div class="container d-flex flex-column jusitfy-content-center align-items-center">
            <form @submit="signIn" class="d-flex flex-column align-items-center justify-content-center">
                <ErrorModal @close-error="closeError" v-if="errorMsg" :errorMsg="errorMsg"></ErrorModal>
                <h1 class="text-light mb-4">Sign In</h1>
                <div class="mb-3">
                    <BasicInput name="email" type="email" label="Email address" />
                </div>
                <div class="mb-3">
                    <BasicInput name="password" type="password" label="Password" />
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
    </div>
</template>

<script setup>
/*
   imports
*/

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
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

const { handleSubmit } = useForm({
    validationSchema: yup.object({
        email: yup.string().email("Enter a valid email!").required("This field is required!"),
        password: yup
            .string()
            .min(8, "Password must be at least 8 symbols!")
            .required("This field is required!"),
    })
})



/*
   Sing In with email
*/


const signIn = handleSubmit(async (values) => {
    try {
        await store.signIn(values.email, values.password);

        router.push({ name: 'Event-Catalog' });

    } catch (error) {
        errorMsg.value = error.message
    }
})

/*
   Sing in with google
*/

const signInGoogle = async () => {
    try {
        await store.signInWithGoogle();

        if (store.currentUser && !store.currentUser.timeZone) {
            store.isEditing = true;
            router.push({ name: 'Profile-Page' });
        } else {
            router.push({ name: 'Home-Page' })
        }

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

        if (store.currentUser && !store.currentUser.timeZone) {
            store.isEditing = true;
            router.push({ name: 'Profile-Page' });
        } else {
            router.push({ name: 'Home-Page' })
        }

    } catch (error) {
        errorMsg.value = error.message
    }
}



/*
   close error modal
*/

const closeError = () => {
    errorMsg.value = null
}


</script>

<style lang="scss" scoped>
form {
    @include form-auth;
}
</style>