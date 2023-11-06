<template>
    <label class="form-control-label" :for="name">{{ `${label}:` }}</label>
    <input class="form-control" v-model="value" :type="type" />
    <span>{{ errorMessage }}</span>
</template>
<script setup>
import { useField } from "vee-validate";
const props = defineProps({
    name: String,
    type: String,
    label: String,
});

const { value, errorMessage } = useField(() => props.name);
</script>
  
<style lang="scss" scoped>
span {
    color: red;
}


</style>