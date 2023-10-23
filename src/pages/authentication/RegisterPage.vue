<template>
    <div>
        <form class="d-flex flex-column align-items-center justify-content-center">
            <h1 class="text-light mb-4">Register</h1>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label text-light">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="username" class="form-label text-light">Username</label>
                <input type="text" class="form-control" id="username">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label text-light">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="mb-3">
                <label for="passwordRepeat" class="form-label text-light">Repeat Password</label>
                <input type="password" class="form-control" id="passwordRepeat">
            </div>
            <div class="mb-5">
                <label for="country" class="form-label text-light">Country</label>
                <input type="text" class="form-control" id="country">
            </div>
            <div class="controls">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

form {
    @include form-auth
}
</style>