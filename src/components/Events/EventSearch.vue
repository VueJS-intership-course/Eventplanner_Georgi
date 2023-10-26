<template>
    <div class="input-group">
        <div class="form-outline">
            <input type="search" id="form1" class="form-control" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"/>
        </div>
        <button type="button" class="btn btn-primary">
            <i class="bi bi-search"></i>
        </button>
    </div>
</template>


<script setup>
/*
   props
*/

const props = defineProps({
    modelValue: {
        type:String,
        required:true
    }
});

</script>