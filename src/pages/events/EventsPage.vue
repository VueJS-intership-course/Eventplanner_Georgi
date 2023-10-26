<template>
    <div class="container">
        <div v-if="isAddClicked">
            <add-event @close-modal="closeModal"></add-event>
        </div>
        <div class="wrapper d-flex flex-column flex-wrap mt-4">
            <div>
                <EventControls @open-add="showAdd" />
            </div>
            <div class="introduction">
                <h1 class="h1 text-center fw-bolder mb-4 text-center">Find your adventure</h1>
            </div>
            <div class="align-self-start p-5">
                <EventList />
            </div>
        </div>
    </div>
</template>

<script setup>
/*
   imports
*/
import EventControls from '@/components/Events/EventControls.vue';
import EventList from '@/components/Events/EventList.vue';
import AddEvent from '@/components/Events/AddEvent.vue';
import { ref } from 'vue';

/*
   add modal handling
*/

const isAddClicked = ref(false)

const showAdd = () => {
    isAddClicked.value = true
}

const closeModal = () => {
    isAddClicked.value = false
    console.log('clicked');
}

</script>


<style scoped lang="scss">
@import '../../styles/variables.scss';
.wrapper {
    border: 1px solid black;
    @include page-background
}


.introduction {
    font-weight: bolder;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
</style>