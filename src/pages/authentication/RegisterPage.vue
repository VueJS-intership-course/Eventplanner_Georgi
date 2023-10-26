<template>
    <div>
        <form @submit.prevent.self="signUp" :validation-schema="schema" class="d-flex flex-column align-items-center justify-content-center">
            <h1 class="text-light mb-4">Sign Up</h1>
            <div class="mb-3">
                <label for="email" class="form-label text-light">Email address</label>
                <input type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="email"/>
            </div>
            <div class="mb-3">
                <label for="username" class="form-label text-light">Username</label>
                <input type="text" name="username" class="form-control" id="username" v-model="username"/>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label text-light">Password</label>
                <input type="password" name="password" class="form-control" id="password" v-model="password"/>
            </div>
            <div class="mb-3">
                <label for="passwordRepeat" class="form-label text-light">Repeat Password</label>
                <input type="password" name="rePass" class="form-control" id="passwordRepeat" v-model="rePass"/>
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
</template>

<script setup>
/*
   imports
*/
import { ref } from 'vue';
import authServices from '@/services/authServices/authServices.js';
import { useRouter } from 'vue-router';
import constants from '@/utils/constants.js';
import AutoComplete from '@/common-templates/AutoComplete.vue';

/*
   router
*/


const router = useRouter();


/*
   Sign Up
*/


const errorMsg = ref('');
const timeZoneSelcted = ref('');
const email = ref('');
const password = ref('');
const rePass = ref('');
const username = ref('');

const signUp = async () => {
 
    if(password.value !== rePass.value) {
        throw new Error('Passwords don\'t match!')
    }

    try {
        const userInfo = {
            email:email.value,
            username:username.value,
            password:password.value,
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