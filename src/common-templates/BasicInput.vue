<template>
    <div>
        <label class="form-control-label" :for="name">{{ `${label}:` }}</label>
        <select v-if="type === 'select'" class="form-control" v-model="value">
            <option v-for="option in selectOptions" :value="option.value">{{ option.label }}</option>
        </select>
        <input v-else class="form-control" :placeholder="placeholder" v-model="value" :type="type" />
        <span>{{ errorMessage }}</span>
    </div>
</template>
  
<script setup>
import { useField } from "vee-validate";
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
        required: false
    },
    placeholder: {
        type: String,
        default: 'Write down here'
    }
});

const { value, errorMessage } = useField(() => props.name);
</script>
  

<style scoped lang="scss">
@import '../styles/variables.scss';

span {
    color: $form-wrong-input;
}
</style>