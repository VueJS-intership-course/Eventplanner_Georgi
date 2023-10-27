<template>
    <div class="card text-center">
        <div class="card-body">
            <h2 class="card-title text-light fw-bold">There are no events yet!</h2>
            <h5 class="card-text text-light mb-4 fw-bold">Please check again later</h5>
            <router-link :to="{ name: 'Home-Page' }" class="btn btn-primary">Go to home</router-link>
        </div>
    </div>
</template>


<style scoped lang="scss">
@import '../../styles/variables.scss';

.card {
    width: 100%;
    padding: 3rem 4rem;
    background-color: $dark-blue;
    border-radius:6%;
}
</style>