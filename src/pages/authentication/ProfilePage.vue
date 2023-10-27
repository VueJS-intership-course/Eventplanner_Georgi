<template>
    <div class="container d-flex flex-column justify-content-center mt-4 vh-100 p-5" v-if="isUserLogged">

        <div class="row d-flex justify-content-center align-items-center">

            <div class="col-md-7">

                <div class="card p-3 py-5 bg-light">

                    <div class="text-center">
                        <img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" width="100" class="rounded-circle">
                    </div>

                    <div class="text-center mt-3">
                        <span class="bg-secondary p-1 px-4 rounded text-white ">{{ userType }}</span>
                        <h5 class="mt-2 mb-0">{{ store.currentUser.username }}</h5>
                        <span class="mb-4">{{ store.currentUser.email }}</span>
                       
                        <ul class="list-group mt-4" v-if="!isUserAdmin">
                            <li class="list-group-item">Tickets bought: {{ store.currentUser.tickets }}$</li>
                            <li class="list-group-item">Total spend money: {{ store.currentUser.total }}$</li>
                        </ul>

                        <div v-if="isUserAdmin" class="buttons mt-4">
                            <button class="btn btn-outline-primary px-4">See Budget</button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </div>
</template>

<script setup>
/*
   imports
*/
import { computed } from 'vue';
import { authStore } from '@/store/auth/authStore.js';

/*
   store
*/

const store = authStore();

const isUserLogged = computed(() => store.currentUser !== null)
const userType = computed(() => store.currentUser.isAdmin ? 'Admin' : 'Client');
const isUserAdmin = computed(() => store.isCurrentUserAdmin)


</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.container {
    @include page-background
}
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


.fonts {
    font-size: 11px;
}

.social-list {
    display: flex;
    list-style: none;
    justify-content: center;
    padding: 0;
}

.social-list li {
    padding: 10px;
    color: #8E24AA;
    font-size: 19px;
}


</style>