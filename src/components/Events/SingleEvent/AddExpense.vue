<template>
    <TheModal @click.self="closeAddExpense">
        <div class="card card-body">
            <h3 class="text-center mb-4 fw-bold">Add expense</h3>
            <form @submit="handleAddExpense">
                <div class="form-group">
                    <BasicInput type="select" :selectOptions="options" name="category" label="Expense Category" />
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
</template>


<script setup>
/*
   imports
*/
import { useForm } from 'vee-validate';
import { eventStore } from '../../../store/events/eventStore';
import * as yup from 'yup';
import { ref } from 'vue';

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
const { handleSubmit } = useForm({
    validationSchema: yup.object({
        category: yup
            .string()
            .required('This field is required'),
        expenseAmount: yup
            .number()
            .required('This field is required')
    })
})

const options = ref([
    {
        value: 'rent',
        label: 'Rent place'
    },
    {
        value: 'food',
        label: 'Food'
    },
    {
        value: 'logistics',
        label: 'Logistics'
    }
])


const handleAddExpense = handleSubmit(async (values) => {
    const expense = {
        category: values.category,
        amount: values.expenseAmount
    };

    await store.addExpense(store.currentEvent, expense);
    
    closeAddExpense()
});
</script>
