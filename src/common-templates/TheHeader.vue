<template>
    <nav class="navbar navbar-expand-lg mb-5 p-2">
        <div class="container-fluid">
            <router-link class="navbar-brand text-xl me-7 fw-bold text-light"
                :to="{ name: 'Home-Page' }">Eventify</router-link>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <div>
                        <span class="navbar-welcome-message nav-link me-3 fw-bold " v-if="store.currentUser">Hello, {{
                            store.currentUser.username
                        }}</span>
                    </div>
                    <div class="nav-control">
                        <router-link class="nav-link text-light me-3 fw-bold"
                            :to="{ name: 'Event-Catalog' }">Events</router-link>
                    </div>
                    <div v-if="!isAuthenticated" class="nav-control">
                        <router-link  class="nav-control text-light me-3 fw-bold"
                            :to="{ name: 'SignUp-Page' }">Sign Up</router-link>
                    </div>
                    <div v-if="!isAuthenticated" class="nav-control">
                        <router-link  class="nav-link text-light me-3 fw-bold"
                            :to="{ name: 'SignIn-Page' }">Sign In</router-link>
                    </div>
                    <div v-if="isAuthenticated" class="nav-control">
                        <router-link class="nav-link text-light me-3 fw-bold"
                            :to="{ name: 'Profile-Page' }">Profile</router-link>
                    </div>
                    <div v-if="isAuthenticated" class="nav-control">
                        <button  class="nav-link text-light me-3 fw-bold"
                            @click="signOut">Logout</button>
                    </div>
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
import { useRouter } from 'vue-router';
import { authStore } from '@/store/auth/authStore.js';

/*
   router
*/

const router = useRouter();

/*
   users store
*/

const store = authStore();

const isAuthenticated = computed(() => store.isCurrentUserEmpty)

/*
    Sign Out
*/

const errorMsg = ref('')

const signOut = async () => {
    try {
        await store.logout();
        router.push({ name: 'Home-Page' })
    } catch (error) {
        errorMsg.value = error.message
    }
};


</script>

<style scoped lang="scss">
@import '../styles/variables.scss';

.navbar {
    @include page-background;
    vertical-align: middle;

    .navbar-brand {
        font-size: 3.2rem;
        font-family: $page-important;
    };

    .active:not(.navbar-brand) {
        text-decoration: underline;
        text-underline-offset: 0.5rem;
        text-decoration-thickness: 20%;
    };

    .navbar-welcome-message {
        color: $welcome-message-color;
    }

}
</style>
