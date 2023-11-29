<template>
    <div>
        <label class="form-label">{{ label }}</label>
        <Field :name="name" v-bind="{ ...typeAvailable }" :value="props.value" v-slot="{ field, handleChange }">
            <component :is="as" ref="element" v-bind="{ ...attributes, ...field, ...typeAvailable, ...props.events }"
                :class="{ 'is-invalid': meta.touched && !meta.valid }" class="form-control" @change="handleChange">
                <option v-if="selectOptions" v-for="option in selectOptions" :value="option.value">{{ option.label }}
                </option>
            </component>
        </Field>
        <ErrorMessage :name="name" class="text-danger" />
    </div>
</template>
  
<script setup>
import { Field, ErrorMessage, useField } from "vee-validate";
import { computed, ref, watch } from "vue";

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        required: true,
    },
    value: {
        type: [String, Number, Date, File, Array],
    },
    selectOptions: {
        type: Array,
    },
    placeholder: {
        type: String,
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    as: {
        type: String,
        default: 'input',
    },
    events: {
        type: Object,
        default: {}
    },
    modelValue: {
        type: String
    }
});

const { meta, value } = useField(props.name);
// const element = ref(null)

const attributes = computed(() => ({
    readonly: props.readonly,
    placeholder: props.placeholder,
}));

const typeAvailable = computed(() => props.type ? { type: props.type } : {});

// watch(() => props.modelValue, (newValue) => {
//     value.value = newValue;
// });

// const internalValue = computed({
//     get: () => props.value,
//     set: (newValue) => {
//         value.value = newValue;
//     },
// });


// defineExpose({
//     element
// })
</script>
  
<style scoped></style>
