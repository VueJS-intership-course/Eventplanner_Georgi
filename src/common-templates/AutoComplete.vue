<template>
  <div class="input-container">
    <!-- <BasicInput type="text" name="search" ref="searchField" :value="props.modelValue" v-model="searchValue" label="Time Zone"
      :events="{ onblur: handleBlur, onfocus: handleFocus }" /> -->
    <label for="time-zone" class="form-label">{{ label }}</label>
    <input class="form-control" ref="searchField" type="text" id="search" autocomplete="off"
      :class="{ invalid: isValidTImeZone }" v-model="searchValue" @focus="handleFocus" @blur="handleBlur" />
    <ul v-show="isDropDownVisible">
      <li v-for="timeZone in searchValues" :key="timeZone">
        <button class="btn btn-light" :class="{ 'selected': modelValue === timeZone }"
          @mousedown.prevent.stop="handleButtonMouseDown" @click.prevent="selectTimeZone(timeZone)">{{ timeZone
          }}</button>
      </li>
      <li v-if="!searchValues.length" class="message-notFound bg-light">Result not found</li>
    </ul>
    <span v-if="isValidTImeZone && checkValidity" class="text-danger">{{ isValidTImeZone }}</span>
  </div>
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

const searchField = ref(null)

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
const searchValue = ref(props.modelValue);
/*
   handle blur
*/
const handleBlur = () => {
  nextTick(() => {
    searchValue.value = props.modelValue
    checkValidity.value = true;
    isDropDownVisible.value = false;
  });
};

/*
  handle focus
*/
const handleFocus = () => {
  isDropDownVisible.value = true;
  searchValue.value = '';
}

/*
   show options
*/
const searchValues = computed(() => props.data.filter(timeZone => timeZone.toLowerCase()
  .includes(searchValue.value.toLocaleLowerCase()))
  .slice(0, 10)
  .sort((a, b) => a.localeCompare(b))
);

/*
   handle time zone option click
*/
const selectTimeZone = (val) => {
  emits('update:modelValue', val);
  searchValue.value = val;
  isDropDownVisible.value = false;
  searchField.value.blur()
  // searchField.value.element.blur()
};

/*
  handle time zone validation
*/
const isValidTImeZone = computed(() => {
  if (checkValidity.value) {
    return !props.data.find(timeZone => timeZone === props.modelValue) ? 'Please select a valid time zone!' : false;
  } else {
    return null;
  }
});

</script>

<style scoped lang="scss">
.input-container {
  position: relative;
  width: 100%;
}

ul {
  width: 100%;
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
    border-radius: 0;
  }

  .message-notFound {
    width: 100%;
    padding: 1rem;
  }
}

.invalid {
  border: 2px solid red;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(.375em + .1875rem) center;
  background-size: calc(.75em + .375rem) calc(.75em + .375rem);
}

.selected {
  background: gray;
  color: white
}
</style>
