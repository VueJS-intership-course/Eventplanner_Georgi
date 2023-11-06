<template>
    <div>
          <ErrorModal @close-error="closeError" v-if="errorMsg" :errorMsg="errorMsg"></ErrorModal>
    <TheModal @click.self="closeEdit">
        <div class="card card-body">
            <h3 class="text-center mb-4 fw-bold">Change password</h3>
            <Form @submit="handleChangePassword" :validation-schema="schema">
                <div class="form-group has-error">
                    <label for="currPass">Current password</label>
                    <Field class="form-control input-lg" placeholder="Write down your current password" id="currPass"
                        name="currPass" type="password" />
                    <ErrorMessage name="currPass" />
                </div>
                <div class="form-group">
                    <label for="newPaas">New Password:</label>
                    <Field class="form-control input-lg" id="newPass" placeholder="Write down your new password"
                        name="newPass" type="password" />
                    <ErrorMessage name="newPass" />
                </div>
                <div class="form-group">
                    <label for="rePass">Repeat New Password:</label>
                    <Field class="form-control input-lg" id="rePass" placeholder="Repeat your new password" name="rePass"
                        type="password" />
                    <ErrorMessage name="rePass" />
                </div>
                <div class="form-group mt-4 text-center">
                    <button class="btn btn-lg btn-primary btn-block mx-auto" type="submit">Save</button>
                </div>
            </Form>
        </div>
    </TheModal>
    </div>
</template>

<script setup>
import { authStore } from '@/store/auth/authStore.js';
import { ErrorMessage, Field, Form } from 'vee-validate';
import * as yup from 'yup'
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter()


const store = authStore();


const closeEdit = () => {
    store.isEditPass = false;
}


const schema = yup.object({
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

});


const errorMsg = ref(null)

const handleChangePassword = async (values) => {
    try {
        await store.changePassword(store.currentUser.email, values.currPass, values.newPass);

        closeEdit();

        router.push({ name: 'SignIn-Page' })
    } catch (error) {
        errorMsg.value = error.message
    }
};


/*
   close error modal
*/

const closeError = () => {
    errorMsg.value = null
}

</script>