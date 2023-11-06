<template>
    <div class="container d-flex flex-column justify-content-center p-5">
        <div class="align-self-center">
            <h2 class="h1 fw-bold text-light">Budget</h2>
        </div>
        <div class="row">
            <LineChart />
        </div>
    </div>
</template>

<script setup>
import LineChart from '@/components/Charts/LineChart.vue';

</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.container {
    @include page-background;
    gap:2rem
}
</style>