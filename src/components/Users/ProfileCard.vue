<template>
    <div class="card p-3 py-5 bg-light">
        <div class="text-center">
            <img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                width="100" class="rounded-circle">
        </div>

        <div class="text-center mt-3" v-if="store.currentUser">
            <h5 class="mt-2 mb-0">{{ store.currentUser.username }}</h5>
            <span class="mb-4">{{ store.currentUser.email }}</span>

            <ul class="list-group mt-4" v-if="!isUserAdmin">
                <li class="list-group-item">Time Zone: {{ store.currentUser.timeZone }}</li>
                <li class="list-group-item">Tickets bought: {{ store.currentUser.tickets }}</li>
                <li class="list-group-item">Total spend money: {{ store.currentUser.total }}$</li>
            </ul>

            <div class="buttons mt-4 d-flex justify-content-center">
                <button v-if="!isUserAdmin" class="btn btn-outline-primary px-4" @click="editOpen">Edit profile</button>
                <router-link v-if="isUserAdmin" class="btn btn-outline-primary px-4" :to="{name:'Analytics-Page'}">Analytics</router-link>
                <button class="btn btn-outline-primary px-4 ml-3" @click="openEditPass">Change password</button>
            </div>
        </div>

        <div v-if="store.isEditPass">
            <ChangePassword />
        </div>
    </div>
</template>

<script setup>
/*
   imports
*/
import { computed } from 'vue';
import { authStore } from '@/store/auth/authStore.js';
import ChangePassword from '@/components/Users/ChangePassword.vue';

/*
   store
*/

const store = authStore();

const isUserAdmin = computed(() => store.isCurrentUserAdmin)


/*
  open edit profile
*/
const editOpen = () => {
    store.isEditing = true
}

/*
   open edit password
*/
const openEditPass = () => {
    store.isEditPass = true
}
</script>


<style scoped lang="scss">
.card {
    border: none;

    position: relative;
    overflow: hidden;
    border-radius: 8px;
}

.card:before {

    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background-color: #d98fe6;
    transform: scaleY(1);
    transition: all 0.5s;
    transform-origin: bottom
}

.card:after {

    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background-color: #8E24AA;
    transform: scaleY(0);
    transition: all 0.5s;
    transform-origin: bottom
}

.card:hover::after {
    transform: scaleY(1);
}


.buttons {
    gap: 1rem
}
</style>