<template>
    <div>
        <div>
            <h1>Home Page</h1>
        </div>
        <div>
            <MapComp @map-ready="mapLoaded" />
        </div>
    </div>
</template>

<script setup>
/*
   imports
*/
import MapComp from '../components/MapComp.vue';

/*
   map handling
*/

const mapLoaded = (map) => {
    console.log(map);
}


</script>

<style scoped lang="scss"></style>