<template>
    <nav class="navbar navbar-expand-lg bg-info">
        <div class="container-fluid">
            <router-link class="navbar-brand text-xl me-7" :to="{ name: 'Home-Page' }">EventApp</router-link>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link class="nav-link text-light me-3" :to="{ name: 'Event-Catalog' }">Events</router-link>
                    <router-link v-if="!isAuthenticated" class="nav-link text-light me-3" :to="{ name: 'SignUp-Page' }">Sign Up</router-link>
                    <router-link v-if="!isAuthenticated" class="nav-link text-light me-3" :to="{ name: 'SignIn-Page' }">Sign In</router-link>
                    <router-link v-if="isAuthenticated" class="nav-link text-light me-3" :to="{ name: 'Profile-Page' }">Profile</router-link>
                    <button v-if="isAuthenticated" class="nav-link text-light me-3" @click="signOut">Logout</button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
/*
   imports
*/
import { computed, ref } from 'vue';
import authServices from '../services/authServices/authServices.js';
import { useRouter } from 'vue-router';
import {authStore} from '@/store/auth/authStore.js';

/*
   router
*/

const router = useRouter();

/*
    Sign Out
*/

const errorMsg = ref('')

const signOut = async () => {
    try {
        await authServices.logout();
        router.push({ name: 'Home-Page' })
    } catch (error) {
        errorMsg.value = error.message
    }
};

/*
   users store
*/

const store = authStore();

const isAuthenticated = computed(() => store.isCurrentUserEmpty)

</script>

<style scoped lang="scss"></style>
