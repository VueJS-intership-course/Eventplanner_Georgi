<template>
    <div>
        <label class="form-label">{{ label }}</label>
        <Field v-bind="{ ...attributes }" :class="{ 'is-invalid': meta.touched && !meta.valid }"
            class="form-control">
            <option v-if="as==='select'" v-for="option in selectOptions" :value="option.value">{{ option.label }}</option>
        </Field>
        <slot name="error" :error="name">
            <ErrorMessage :name="name" class="text-danger" />
        </slot>
    </div>
</template>
  
<script setup>
import { Field, ErrorMessage, useField } from "vee-validate";
import { computed } from "vue";

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'text'
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
        type: Boolean,
        default: false
    },
    as: {
        type: String,
        default: 'input'
    }
});

const { meta } = useField(props.name);

const attributes = computed(() => ({
    readonly: props.readonly,
    type: props.type,
    value: props.value,
    name: props.name,
    placeholder: props.placeholder,
    as: props.as !== 'input' ? props.as : 'input',
}))

</script>
  
<style scoped></style>
