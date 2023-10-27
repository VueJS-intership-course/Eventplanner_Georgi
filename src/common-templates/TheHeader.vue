<template>
    <nav class="navbar navbar-expand-lg mb-5 p-2">
        <div class="container-fluid">
            <router-link class="navbar-brand text-xl me-7 fw-bold text-light" :to="{ name: 'Home-Page' }">Eventify</router-link>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <span class="nav-link text-dark me-3 fw-bold" v-if="isAuthenticated">Hello, {{ store.currentUser.username }}</span>
                    <router-link class="nav-link text-light me-3 fw-bold" :to="{ name: 'Event-Catalog' }">Events</router-link>
                    <router-link v-if="!isAuthenticated" class="nav-link text-light me-3 fw-bold" :to="{ name: 'SignUp-Page' }">Sign Up</router-link>
                    <router-link v-if="!isAuthenticated" class="nav-link text-light me-3 fw-bold" :to="{ name: 'SignIn-Page' }">Sign In</router-link>
                    <router-link v-if="isAuthenticated" class="nav-link text-light me-3 fw-bold" :to="{ name: 'Profile-Page' }">Profile</router-link>
                    <button v-if="isAuthenticated" class="nav-link text-light me-3 fw-bold" @click="signOut">Logout</button>
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
import authServices from '@/services/authServices/authServices.js';
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

<style scoped lang="scss">
@import '../styles/variables.scss';
.navbar {
    @include page-background;
    vertical-align: middle;

    .navbar-brand {
        font-size: 3.2rem;
        font-family: $page-important;
    }
}
</style>
