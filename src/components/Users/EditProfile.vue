<template>
    <ErrorModal v-if="errorMsg" :errorMsg="errorMsg"></ErrorModal>
    <TheModal @click.self="closeEdit">
        <div class="card card-body">
            <h3 class="text-center mb-4 fw-bold">Profile information</h3>
            <form @submit.prevent="handleEdit">
                <div class="form-group has-error">
                    <label for="email">Email</label>
                    <input class="form-control input-lg" readonly id="email" :value="store.currentUser.email" name="email"
                        type="text" />
                </div>
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input class="form-control input-lg" placeholder="Sequrity Answer" name="username" v-model="username"
                        type="text" />
                </div>
                <div class="form-group">
                    <label>TimeZone: </label>
                    <auto-complete v-model="selectedTimeZone" :data="constants.allTimeZones"></auto-complete>
                </div>
                <div class="form-group mt-4 text-center">
                    <button class="btn btn-lg btn-primary btn-block mx-auto" type="submit">Save</button>
                </div>
            </form>
        </div>
    </TheModal>
</template>

<script setup>
/*
   imports
*/
import { authStore } from '@/store/auth/authStore.js';
import AutoComplete from '@/common-templates/AutoComplete.vue';
import constants from '@/utils/constants.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

/*
   router
*/

const router = useRouter()

/*
   store
*/
const store = authStore();

/*
   handle edit
*/

const selectedTimeZone = ref(store.currentUser.timeZone);
const username = ref(store.currentUser.username);

const closeEdit = () => {
    store.isEditing = false
}

const errorMsg = ref(null)

const handleEdit = () => {
    try {
        const user = {
            email: store.currentUser.email,
            username: username.value,
            timeZone: selectedTimeZone.value
        }

        const isConfirmed = confirm('Are you sure you want to change your profile information?')

        if (isConfirmed) {
            store.editProfile(user);
        }

        closeEdit()

        router.push({ name: 'Home-Page' })
    } catch (error) {
        errorMsg.value = error.message
    }
}
</script>


<style scoped lang="scss"></style>