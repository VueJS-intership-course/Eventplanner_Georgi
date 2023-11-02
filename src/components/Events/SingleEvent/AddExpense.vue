<template>
    <TheModal @click.self="closeAddExpense">
        <div class="card card-body">
            <h3 class="text-center mb-4 fw-bold">Add expense</h3>
            <Form @submit="handleAddExpense" >
                <div class="form-group">
                    <label for="category">Expense Category:</label>
                    <Field name="category" class="form-select" id="category" as="select" value="rent">
                        <option value="rent">Rent place</option>
                        <option value="food">Food</option>
                        <option value="logistics">Logistics</option>
                    </Field>
                    <ErrorMessage name="category" />
                </div>
                <div class="form-group">
                    <label for="expenseAmount">Amount:</label>
                    <Field class="form-control input-lg" id="expenseAmount" name="expenseAmount" type="number" />
                    <ErrorMessage name="expenseAmount" />
                </div>
                <div class="form-group mt-4 text-center">
                    <button class="btn btn-lg btn-primary btn-block mx-auto" type="submit">Save</button>
                </div>
            </Form>
        </div>
    </TheModal>
</template>


<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { eventStore } from '../../../store/events/eventStore';

const store = eventStore();


const closeAddExpense = () => {
    store.isAddExpense = false;
};


const handleAddExpense =async  (values) => {
    const expense = {
        category: values.category,
        amount: values.expenseAmount
    };

    await store.addExpense(store.currentEvent, expense);

    closeAddExpense()
}
</script>