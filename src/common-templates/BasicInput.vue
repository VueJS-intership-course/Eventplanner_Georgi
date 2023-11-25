<template>
    <label class="form-label">{{ label }}</label>
    <Field v-if="type !== 'select' && type !== 'file'" :value="value" :name="name" v-slot="{ field, meta }"
        class="form-control">
        <input :placeholder="placeholder" class="form-control" :class="{ 'is-invalid': meta.touched && !meta.valid }"
            :type="type" v-bind="field" />
    </Field>
    <Field v-if="type === 'file'" :name="name" v-slot="{ handleChange, handleBlur, meta }" class="form-control">
        <input type="file" class="form-control" @change="handleChange" @blur="handleBlur"
            :class="{ 'is-invalid': meta.touched && !meta.valid }" />
    </Field>
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
});

const { meta } = useField(props.name);
</script>
  
<style scoped></style>
  