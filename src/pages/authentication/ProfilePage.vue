<template>
    <div class="container d-flex flex-column justify-content-center mt-4 vh-100 p-5" >
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-md-7">
                <ProfileCard/>
            </div>

            <Teleport to="body" v-if="store.isEditing">
                <EditProfile/>
            </Teleport>
        </div>
    </div>
</template>

<script setup>
import ProfileCard from '@/components/Users/ProfileCard.vue';
import { authStore } from '../../store/auth/authStore';
import EditProfile from '../../components/Users/EditProfile.vue';

const store = authStore();

</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.container {
    @include page-background
}

</style>