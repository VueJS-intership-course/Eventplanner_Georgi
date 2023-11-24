<template>
    <div>
        <ErrorModal @close-error="closeError" v-if="errorMsg" :errorMsg="errorMsg" />
        <TheModal @click.self="closeAddExpense">
            <div class="card card-body">
                <h3 class="text-center mb-4 fw-bold">Add expense</h3>
                <form @submit="handleAddExpense">
                    <div class="form-group">
                        <BasicInput type="select" :selectOptions="constants.expenseOptions" name="category" label="Expense Category" />
                    </div>
                    <div class="form-group">
                        <BasicInput type="number" label="Amount" name="expenseAmount" />
                    </div>
                    <div class="form-group mt-4 text-center">
                        <button class="btn btn-lg btn-primary btn-block mx-auto" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </TheModal>
    </div>
</template>


<script setup>
/*
   imports
*/
import { useForm } from 'vee-validate';
import { eventStore } from '@/store/events/eventStore.js';
import * as yup from 'yup';
import { ref } from 'vue';
import showNotifications from '@/utils/notifications.js';
import constants from '@/utils/constants.js';

/*
   store
*/
const store = eventStore();


/*
   open modal
*/
const closeAddExpense = () => {
    store.isAddExpense = false;
};

/*
   handle add expense form
*/

const errorMsg = ref(null);

const { handleSubmit } = useForm({
    validationSchema: yup.object({
        category: yup
            .string()
            .required('This field is required'),
        expenseAmount: yup
            .number()
            .typeError('Amount must be a number')
            .required("This field is required!")
    })
})



const handleAddExpense = handleSubmit(async (values) => {
    try {
        const expense = {
            category: values.category,
            amount: values.expenseAmount
        };

        await store.addExpense(store.currentEvent, expense);

        closeAddExpense();

        showNotifications(`Successfully added ${expense.category} expense with ${expense.amount}$ amount`)
    } catch (error) {
        closeAddExpense();

        errorMsg.value = error.message
    }
});


/*
   close error modal
*/
const closeError = () => {
    errorMsg.value = null
}
</script>
