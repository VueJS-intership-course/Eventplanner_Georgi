<template>
  <div v-if="store.currentEvent" class="container d-flex flex-column justify-content-center p-5">
    <div v-if="store.currentEvent.expenses.length">
      <h2 class="fw-bold text-light text-center p-3">{{ store.currentEvent.name }}'s analytics</h2>
      <LineChart type="pie" :data="data" :title="store.currentEvent.name"
        :subtitle="`Budget: ${store.currentEvent.budget}$`" />
    </div>
    <div class="text-center p-3" v-if="!store.currentEvent.expenses.length">
      <h2 class="fw-bold text-light">There is no expenses added for {{ store.currentEvent.name }}</h2>
      <button @click="handleAddExpense" class="btn btn-primary">Add one</button>
    </div>
  </div>
</template>

<script setup>
/*
  imports
*/
import { computed } from 'vue';
import LineChart from '@/components/Charts/LineChart.vue';
import { eventStore } from '@/store/events/eventStore.js';
import { useRouter } from 'vue-router';

/*
   router
*/
const router = useRouter();

/*
   props
*/
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

/*
  store
*/
const store = eventStore();

/*
   get current event
*/
store.getCurrentEvent(props.id)

/*
  retrieve single event analytics
*/
const data = computed(() => store.singleEventAnalytics);


/*handle add expenses if empty */
const handleAddExpense = () => {
  store.isAddExpense = true;
  router.push({ name: 'Single-Event'})
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.container {
  @include page-background
}
</style>