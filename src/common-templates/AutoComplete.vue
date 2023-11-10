<template>
  <div>
    <input class="form-control" type="text" id="search" autocomplete="off" :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" @focus="isDropDownVisible = true" @blur="handleBlur" />
    <ul v-show="isDropDownVisible">
      <li v-for="timeZone in searchValues" :key="timeZone">
        <button class="btn btn-light" @mousedown.prevent.stop="handleButtonMouseDown"
          @click.prevent="selectTimeZone(timeZone)">{{ timeZone }}</button>
      </li>
    </ul>
    <p v-if="isValidTImeZone && checkValidity" class="text-danger">{{ isValidTImeZone }}</p>
  </div>
</template>

<script setup>
/*
   imports
*/
import { ref, computed, onUnmounted } from 'vue';

/*
  emits
*/
const emits = defineEmits(['update:modelValue']);

/*
  props
*/
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


/*
   handling custom autocomplete dropdown
*/
const isDropDownVisible = ref(false);
const checkValidity = ref(false);
const blurTimeout = ref(null);

const handleBlur = () => {
  blurTimeout.value = setTimeout(() => {
    checkValidity.value = true;
    isDropDownVisible.value = false;
  }, 100);
};

const handleButtonMouseDown = () => {
  clearTimeout(blurTimeout.value);
};

const searchValues = computed(() => props.data.filter(timeZone => timeZone.toLowerCase()
  .includes(props.modelValue.toLocaleLowerCase()))
  .slice(0, 10)
  .sort((a, b) => a.localeCompare(b))
);

const selectTimeZone = (val) => {
  emits('update:modelValue', val);
  isDropDownVisible.value = false;
};

const isValidTImeZone = computed(() => {
  if (checkValidity.value) {
    return !props.data.find(timeZone => timeZone === props.modelValue) ? 'Please select a valid time zone!' : null;
  } else {
    return null;
  }
});

onUnmounted(() => {
  clearTimeout(blurTimeout.value);
});
</script>

<style scoped lang="scss">
ul {
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
