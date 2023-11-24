<template>
    <div>
        <label class="form-control-label" :for="name">{{ `${label}:` }}</label>
        <input v-if="type === 'file'" class="form-control" @change="handleFileChange" :placeholder="placeholder" :type="type" />
        <select v-if="type === 'select'" class="form-control" v-model="value">
            <option v-for="option in selectOptions" :value="option.value">{{ option.label }}</option>
        </select>
        <input v-if="type !== 'file' && type !=='select'" class="form-control" :placeholder="placeholder" v-model="value" :type="type" />
        <span>{{ errorMessage }}</span>
    </div>
</template>

<script setup>
/*
   imports
*/
import { useField } from "vee-validate";

/*
   props
*/
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    selectOptions: {
        type: Array,
    },
    placeholder: {
        type: String,
        default: 'Write down here'
    }
});

/*
  handle value and error message
*/
const { value, errorMessage } = useField(() => props.name);

/*
   handle input type file
*/
const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    value.value = selectedFile;

};
</script>

<style scoped lang="scss">

span {
    color: $form-wrong-input;
}
</style>
