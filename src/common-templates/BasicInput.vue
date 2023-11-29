<template>
    <div>
        <label class="form-label">{{ label }}</label>
        <Field :name="name" v-bind="typeAvailable" :value="props.value" v-slot="{ field, handleChange }">
            <component :is="as" ref="element" v-bind="{ ...field, ...typeAvailable, ...events, ...$attrs }"
                :class="{ 'is-invalid': meta.touched && !meta.valid }" class="form-control" @change="handleChange">
                <option v-if="selectOptions" v-for="option in selectOptions" :value="option.value">{{ option.label }}
                </option>
            </component>
        </Field>
        <ErrorMessage :name="name" class="text-danger" />
    </div>
</template>
  
<script setup>
/*
   imports
*/
import { Field, ErrorMessage, useField } from "vee-validate";
import { computed, ref, watch } from "vue";

/*
   stop attributes inheritance to root 
*/
defineOptions({
    inheritAttrs: false,
})

/*
   props
*/
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

/*
   accessing Field options
*/
const { meta, value } = useField(props.name);

/*
   component template ref
*/
const element = ref(null)

/*
   check if type property
*/
const typeAvailable = computed(() => props.type ? { type: props.type } : {});

/*
   update modelValue
*/
watch(() => props.modelValue, (newValue) => {
    value.value = newValue;
});

/*
   expose template ref
*/
defineExpose({
    element
})
</script>
  
<style scoped></style>
