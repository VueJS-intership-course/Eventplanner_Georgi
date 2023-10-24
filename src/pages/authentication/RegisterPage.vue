<template>
    <div>
        <Form @submit="signUp" :validation-schema="schema" class="d-flex flex-column align-items-center justify-content-center">
            <h1 class="text-light mb-4">Sign Up</h1>

            <div class="mb-3">
                <label for="email" class="form-label text-light">Email address</label>
                <Field type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp"/>
                <ErrorMessage name="email"/>
            </div>
            <div class="mb-3">
                <label for="username" class="form-label text-light">Username</label>
                <Field type="text" name="username" class="form-control" id="username" />
                <ErrorMessage name="username"/>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label text-light">Password</label>
                <Field type="password" name="password" class="form-control" id="password"  />
                <ErrorMessage name="password"/>
            </div>
            <div class="mb-3">
                <label for="passwordRepeat" class="form-label text-light">Repeat Password</label>
                <Field type="password" name="rePass" class="form-control" id="passwordRepeat"/>
                <ErrorMessage name="rePass"/>
            </div>
            <div class="mb-4">
                <label for="time-zone" class="form-label text-light">Time zone</label>
                <select  name="country" class="form-control" id="time-zone" v-model="timeZoneSelcted">
                    <option v-for="timeZone in constants.allTimeZones" :value="timeZone">{{ timeZone }}</option>
                </select>
            </div>
            <div class="controls">
                <button type="submit" class="btn btn-primary">Submit</button>
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
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import constants from '../../utils/constants.js'
/*
   router
*/

console.log(constants.allTimeZones);

const router = useRouter();

/*
   validation
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
    country: yup
        .string()
        .required('This field is required'),
    city: yup
        .string()
        .required('This field is required'),
})


/*
   Sign Up
*/


const errorMsg = ref('');
const timeZoneSelcted = ref('');

const signUp = async (values) => {
    try {

        if (password.value !== rePass.value) {
            throw new Error('Passwords don\'t match!');
        }

        const userInfo = {
            email:values.email,
            username:values.username,
            password:values.password,
            timeZone: timeZoneSelcted.value,
        };

        await authServices.signUp(userInfo);

        router.push({ name: 'Event-Catalog' });
    } catch (error) {
        console.log(error);
        errorMsg.value = error.message;
    }
}

</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

form {
    @include form-auth
}
</style>