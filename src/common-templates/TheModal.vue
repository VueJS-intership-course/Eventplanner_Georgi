<template>
    <div class="back-modal">
        <div class="add-modal container py-3 d-flex flex-column">
               <slot></slot>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';

.back-modal {
    @include modal-style;
}
</style>