<template>
    <TheModal @click.self="closeModal">
        <div class="error-modal bg-light p-4" id="exampleModalCenter">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header mb-2 p-3">
                        <h5 class="modal-title text-danger fw-bold" id="exampleModalCenterTitle">Error occured</h5>
                        <button class="btn btn-primary" @click="closeModal">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body mb-3 p-3">{{ errorMsg }}</div>
                    <div class="modal-footer p-3">
                        <button type="button" class="btn btn-outline-primary" @click="closeModal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </TheModal>
</template>


<script setup>
/*
   props
*/

const props = defineProps({
    errorMsg: {
        type:String,
        required:true
    }
});

/*
   emits
*/

const emits = defineEmits(['close-error']);


const closeModal = () => {
    emits('close-error')
}

</script>


<style scoped lang="scss">
.error-modal {
    width: 50%;
}
</style>