<template>
  <label for="time-zone" class="form-label">{{ label }}</label>
  <input class="form-control" type="text" id="search" autocomplete="off" :class="{ invalid: isValidTImeZone }"
    :value="modelValue" @input="handleInput" @focus="isDropDownVisible = true" @blur="handleBlur" />
  <ul v-show="isDropDownVisible">
    <li v-for="timeZone in searchValues" :key="timeZone">
      <button class="btn btn-light" @mousedown.prevent.stop="handleButtonMouseDown"
        @click.prevent="selectTimeZone(timeZone)">{{ timeZone }}</button>
    </li>
  </ul>
  <span v-if="isValidTImeZone && checkValidity" class="text-danger">{{ isValidTImeZone }}</span>
</template>

<script setup>
/*
   imports
*/
import { ref, computed, nextTick } from 'vue';

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
  label: {
    type: String,
    default: 'Auto Complete'
  }
});


/*
   handling custom autocomplete dropdown
*/
const isDropDownVisible = ref(false);
const checkValidity = ref(false);

/*
   handle blur
*/
const handleBlur = () => {
  nextTick(() => {
    checkValidity.value = true;
    isDropDownVisible.value = false;
  });
};


const handleInput = (event) => {
  emits('update:modelValue', event.target.value);
  isDropDownVisible.value = true;
};

/*
   show options
*/
const searchValues = computed(() => props.data.filter(timeZone => timeZone.toLowerCase()
  .includes(props.modelValue.toLocaleLowerCase()))
  .slice(0, 10)
  .sort((a, b) => a.localeCompare(b))
);

/*
   handle time zone option click
*/
const selectTimeZone = (val) => {
  emits('update:modelValue', val);
  isDropDownVisible.value = false;
};

/*
  handle time zone validation
*/
const isValidTImeZone = computed(() => {
  if (checkValidity.value) {
    return !props.data.find(timeZone => timeZone === props.modelValue) ? 'Please select a valid time zone!' : null;
  } else {
    return null;
  }
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

.invalid {
  border: 2px solid red;
}
</style>
