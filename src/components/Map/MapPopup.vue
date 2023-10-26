<template>
    <div ref="root" class="ol-popup popup-wrapper">
        <a href="#" @click.prevent.stop="onClose" ref="popupCloser" class="ol-popup-closer"></a>
        <div ref="popupContent">
            <slot></slot>
        </div>
    </div>
</template>
  
<script setup>
/*
   imports
*/
import Overlay from "ol/Overlay.js";
import { onMounted, ref } from "vue";

/*
   Popup handling
*/

const root = ref(null);
const overlay = ref(null)

onMounted(() => {
    overlay.value = new Overlay({
        element: root.value,
        autoPan: {
            animation: {
                duration: 250,
            },
        },
    });
})


const onClose = () => {
    overlay.value.setPosition(undefined);
    return false
}

defineExpose({
    overlay
})
</script>
  
<style lang="scss" scoped>
.ol-popup {
    position: absolute;
    background-color: white;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 280px;
}

.ol-popup:after,
.ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
}

.ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
}

.ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
}

.ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
}

.ol-popup-closer:after {
    content: "✖";
}
</style>