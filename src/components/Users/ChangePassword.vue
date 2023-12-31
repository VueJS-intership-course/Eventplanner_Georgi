<template>
    <TheModal @click.self="closeEdit">
        <div class="card card-body">
            <ErrorModal @close-error="closeError" v-if="errorMsg" :errorMsg="errorMsg"></ErrorModal>
            <h3 class="text-center mb-4 fw-bold">Change password</h3>
            <form @submit="handleChangePassword">
                <div class="form-group has-error">
                    <BasicInput type="password" name="currPass" label="Current password"
                        placeholder="Write down your current password" />
                </div>
                <div class="form-group">
                    <BasicInput type="password" name="newPass" label="New Password"
                        placeholder="Write down your new password" />
                </div>
                <div class="form-group">
                    <BasicInput type="password" name="rePass" label="Repeat New Password"
                        placeholder="Repeat your new password" />
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
import * as yup from 'yup'
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useForm } from 'vee-validate';


/*
   router
*/
const router = useRouter()

/*
   store
*/
const store = authStore();

/*
   close edit password modal
*/
const closeEdit = () => {
    store.isEditPass = false;
}


/*
   validation schema
*/
const { handleSubmit } = useForm({
    validationSchema: yup.object({
        currPass: yup
            .string()
            .required("This field is required!"),
        newPass: yup
            .string()
            .min(8, "Password must be at least 8 symbols!")
            .required("This field is required!"),
        rePass: yup
            .string()
            .required("This field is required!")
            .oneOf([yup.ref("newPass")], "Passwords does not match!"),

    })
})


/*
   handle change password form
*/

const errorMsg = ref(null)

const handleChangePassword = handleSubmit(async (values) => {
    try {

        const userCredentials = {
            email: store.currentUser.email,
            currPass: values.currPass,
            newPass: values.newPass
        }

        const isConfirmed = confirm('Are you sure you want to change your password?');

        if (isConfirmed) {
            await store.changePassword(userCredentials);
            closeEdit();
            router.push({ name: 'SignIn-Page' })
        }


    } catch (error) {
        errorMsg.value = error.message
    }
})


/*
   close error modal
*/

const closeError = () => {
    errorMsg.value = null
}

</script>


<style scoped lang="scss"></style>