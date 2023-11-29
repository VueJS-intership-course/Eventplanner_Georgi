<template>
    <div class="card bg-dark text-white text-center">
        <img src="https://t4.ftcdn.net/jpg/02/85/04/29/360_F_285042967_x9eRA3K7Ccfh8LeJyCrdZ2UYpqXPD5M1.jpg"
            class="card-img" alt="Welcome">
        <div class="card-img-overlay mt-5">
            <h5 class="card-title fw-bold">Welcome to Eventify</h5>
            <p class="card-text mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur porro, accusamus
                voluptatibus nihil eius in ad veritatis odit maiores ipsum veniam inventore minus, fugit neque, pariatur
                dolor omnis. Laborum, aliquid.</p>
            <RouterLink class="btn btn-primary" :to="{ name: 'Event-Catalog' }">See events</RouterLink>
        </div>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>

img {
    filter: blur(1px);    
}

.card-title {
    font-family: $page-important
}


.card-text {
    font-weight: bold;
}
</style>