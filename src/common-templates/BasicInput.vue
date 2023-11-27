<template>
    <label class="form-label">{{ label }}</label>
    <Field v-if="type !== 'select'" :value="value" :name="name" :readonly="readonly" class="form-control" :type="type" :placeholder="placeholder"/>
    <Field v-if="type === 'select'" class="form-control" :as="'select'" :name="name" :value="value"
        :class="{ 'is-invalid': meta.touched && !meta.valid }">
        <option v-for="option in selectOptions" :value="option.value">{{ option.label }}</option>
    </Field>
    <ErrorMessage :name="name" class="text-danger" />
</template>
  
<script setup>
import { Field, ErrorMessage, useField } from "vee-validate";

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    value: {
        type: [String, Number, Date],
    },
    selectOptions: {
        type: Array,
    },
    placeholder: {
        type: String,
    },
    readonly: {
        type:Boolean,
        default: false
    }
});

const { meta } = useField(props.name);
</script>
  
<style scoped></style>
  