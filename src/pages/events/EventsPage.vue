<template>
    <div class="wrapper d-flex flex-column mt-4">
        <div>
             <EventControls/>
        </div>
        <div class="align-self-center">
            <EventList />
        </div>
    </div>
</template>

<script setup>
import EventControls from '../../components/Events/EventControls.vue';
import EventList from '../../components/Events/EventList.vue';
</script>


<style scoped lang="scss">
</style>