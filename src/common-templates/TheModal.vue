<template>
    <div class="back-modal">
        <div class="add-modal container py-3 d-flex justify-content-center">
               <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount } from 'vue';

onBeforeMount(() => {
    document.body.style.overflow = 'hidden';
})

onBeforeUnmount(() => {
    document.body.style.overflow = '';
})
</script>

<style lang="scss" scoped>

.back-modal {
    @include modal-style;
};
</style>