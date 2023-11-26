<template>
    <div class="alert alert-danger" role="alert" @click="closeModal">
        <h4 class="fw-bold text-danger text-center">Error occured!</h4>
        <p class="text-danger text-center">{{ errorMsg }}</p>
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