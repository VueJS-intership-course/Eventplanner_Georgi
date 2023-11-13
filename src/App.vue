<template>
    <div>
        <TheHeader />
    </div>
    <div>
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
 
</template>

<script setup>
import TheHeader from '@/common-templates/TheHeader.vue';

</script>


<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>