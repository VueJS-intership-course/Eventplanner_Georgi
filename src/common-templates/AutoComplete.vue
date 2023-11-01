<template>
    <div>
        <input class="form-control" type="text" id="search" autocomplete="off" placeholder="Type here..."
            :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
        <ul v-show="isDropDownVisible">
            <li v-for="timeZone in searchValues" :key="timeZone">
                <button class="btn btn-light" @click.prevent="selectTimeZone(timeZone)">{{ timeZone }}</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const emits = defineEmits(['update:modelValue']);
const isDropDownVisible = ref(false);

const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    data: {
        type: Array,
        required: true,
    },
});

const searchValues = computed(() => {
    if (props.modelValue === '') {
        isDropDownVisible.value = false;
        return [];
    }

    let matches = 0;

    return props.data.filter((timeZone) => {
        if (
            timeZone.toLowerCase().includes(props.modelValue.toLowerCase()) &&
            matches < 15
        ) {
            isDropDownVisible.value = true;
            matches++;
            return timeZone;
        }
    });
});

const selectTimeZone = (val,) => {
    emits('update:modelValue', val);
    isDropDownVisible.value = false;
};
</script>

<style scoped lang="scss">
ul {
    display: flex;
    position: absolute;
    flex-direction: column;
    padding: 0;
    justify-content: center;
    z-index: 4;
    list-style: none;
    max-height: 300px;
    overflow-y: auto;

    button {
        width: 100%;
        padding: 1rem;
        max-width: 212px;
        min-width: 212px;
    }
}
</style>
