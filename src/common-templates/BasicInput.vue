<template>
    <div class="mb-3">
        <label class="form-label">{{ label }}</label>
        <Field v-if="type !== 'select' && type !== 'file'" :value="value" :name="name" v-slot="{ field }">
            <input :placeholder="placeholder" :type="type" class="form-control" v-bind="field">
        </Field>
        <Field v-if="type === 'file'" :name="name" v-slot="{ handleChange, handleBlur }">
            <input class="form-control" type="file" @change="handleChange" @blur="handleBlur" />
        </Field>
        <Field v-if="type === 'select'" class="form-control" :as="'select'" :name="name" :value="value">
            <option v-for="option in selectOptions" :value="option.value">{{ option.label }}</option>
        </Field>
        <ErrorMessage :name="name" class="text-danger" />
    </div>
</template>
  
<script setup>
import { Field, ErrorMessage} from "vee-validate";

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    type: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: [String, Number, Date] },
    selectOptions: { type: Array },
    placeholder: { type: String },
});

</script>
  