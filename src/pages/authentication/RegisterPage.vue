<template>
    <div>
        <ErrorModal @close-error="closeError" v-if="errorMsg" :errorMsg="errorMsg"></ErrorModal>
        <div class="container d-flex flex-column jusitfy-content-center align-items-center">
            <form @submit.self="signUp" class="d-flex flex-column align-items-center justify-content-center">
                <h1 class="text-light mb-4">Sign Up</h1>
                <div class="mb-3">
                    <BasicInput name="email" type="email" label="Email address" />
                </div>
                <div class="mb-3">
                    <BasicInput name="username" type="text" label="Username" />
                </div>
                <div class="mb-3">
                    <BasicInput name="password" type="password" label="Password" />
                </div>
                <div class="mb-3">
                    <BasicInput name="rePass" type="email" label="Email address" />
                </div>
                <div class="mb-3">
                    <BasicInput name="country" type="text" label="Country" />
                </div>
                <div class="mb-4">
                    <label for="time-zone" class="form-label text-light">Time zone</label>
                    <auto-complete v-model="timeZoneSelcted" :data="constants.allTimeZones"></auto-complete>
                </div>
                <div class="controls">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
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
import * as yup from 'yup'
import { authStore } from '@/store/auth/authStore.js';
import { useForm } from 'vee-validate';

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

const {handleSubmit} = useForm({
    validationSchema: yup.object({
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
})


const timeZoneSelcted = ref('');
const errorMsg = ref(null)

const signUp = handleSubmit(async (values) => {

    
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
})



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