<template>
    <TheModal @click.self="closeEdit">
        <div class="card card-body">
            <ErrorModal @close-error="closeError" v-if="errorMsg" :errorMsg="errorMsg"></ErrorModal>
            <h3 class="text-center mb-4 fw-bold">Profile information</h3>
            <form @submit.prevent="handleEdit">
                <div class="form-group has-error">
                    <BasicInput type="email" name="email" :readonly="true" :value="store.currentUser.email" label="Email"/>
                </div>
                <div class="form-group">
                    <BasicInput type="text" name="username" :value="store.currentUser.username" label="Username"/>
                </div>
                <div class="form-group">
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
import showNotifications from '@/utils/notifications.js'
import { useForm } from 'vee-validate';
import * as yup from 'yup';


/*
   store
*/
const store = authStore();


/*
   validation
*/

const {handleSubmit} = useForm({
    validationSchema: yup.object({
        email: yup.string(),
        username: yup.string().required('This field is required')
    })
})

/*
   handle edit
*/

const selectedTimeZone = ref(store.currentUser.timeZone);

const closeEdit = () => {
    store.isEditing = false
}

const errorMsg = ref(null)

const handleEdit = handleSubmit((values) => {
    try {
        if (!constants.allTimeZones.find(tz => tz === selectedTimeZone.value)) {
        throw new Error('Please select valid time zone!')
    }

        const user = {
            email: values.email,
            username: values.username,
            timeZone: selectedTimeZone.value
        }

        const isConfirmed = confirm('Are you sure you want to change your profile information?')

        if (isConfirmed) {
            store.editProfile(user);
            showNotifications(`Profile has been edited!`);
            closeEdit();
        }


    } catch (error) {
        errorMsg.value = error.message
    }
})


/*
   close error modal
*/

const closeError = () => {
    errorMsg.value = null;
}

</script>


<style scoped lang="scss"></style>