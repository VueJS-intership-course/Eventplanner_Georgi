<template>
    <div class="alert alert-danger" role="alert" @click="closeModal">
        <p>{{ errorMsg }}</p>
    </div>
</template>


<script setup>
/*
   props
*/

const props = defineProps({
    errorMsg: {
        type: String,
        required: true
    }
});

/*
   emits
*/

const emits = defineEmits(['close-error']);

/*
   close error modal
*/
const closeModal = () => {
    emits('close-error')
}

</script>


<style scoped lang="scss">
.error-modal {
    width: 50%;
}
</style>