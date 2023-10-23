<template>
    <div>
        <TheHeader/>
    </div>
    <div>
        <router-view :key="$route.fullPath"></router-view>
    </div>
</template>

<script setup>
import TheHeader from './common-templates/TheHeader.vue';
</script>

<style scoped lang="scss"></style>