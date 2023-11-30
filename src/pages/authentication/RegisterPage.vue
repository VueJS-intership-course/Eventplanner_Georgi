<template>
    <div class="container d-flex flex-column jusitfy-content-center align-items-center">
        <form @submit.self="signUp" class="d-flex flex-column align-items-center justify-content-center">
            <ErrorModal @close-error="closeError" v-if="errorMsg" :errorMsg="errorMsg"></ErrorModal>
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
                <BasicInput name="rePass" type="password" label="Repeat password" />
            </div>
            <div class="mb-3">
                <BasicInput name="country" type="text" label="Country" />
            </div>
            <div class="mb-4">
                <auto-complete name="timeZone" label="Time Zone" v-model="timeZoneSelcted"
                    :data="constants.allTimeZones"></auto-complete>
            </div>
            <div class="controls">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
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
  validation
*/

const { handleSubmit } = useForm({
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
        country: yup
            .string()
            .required('This field is required!'),
        timeZone: yup
            .string()
            .oneOf([...constants.allTimeZones], 'Invalid Time Zone')
            .required('This field is required!'),
    })
})

/*
   Sign Up 
*/

const timeZoneSelcted = ref('');
const errorMsg = ref(null)

const signUp = handleSubmit(async (values) => {
    try {
        const userInfo = {
            email: values.email,
            username: values.username,
            password: values.password,
            timeZone: values.timeZone,
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
form {
    @include form-auth
}
</style>