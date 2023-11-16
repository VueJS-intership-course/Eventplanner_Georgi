import EventSearch from '@/components/Events/Catalog-controls/EventsFilter.vue';
import { mount } from '@vue/test-utils';
import { it, expect } from '@jest/globals';
import {eventStore} from '@/store/events/eventStore.js'
import { createTestingPinia } from '@pinia/testing';
import { createPinia, setActivePinia } from 'pinia';
import router from '@/router/index.js'

setActivePinia(createPinia())

const wrapper = mount(EventSearch, {
  global: {
    plugins: [router, createTestingPinia({
        initialState: {
            eventStore: eventStore()
        },
    })],
  },
});


jest.mock("firebase/app", () => {
    return {
        initializeApp: jest.fn(),
        auth: jest.fn(),
        firestore: jest.fn(),
    };
});


it('should handle filters correctly', async () => {
  const locationInput = wrapper.find('input[name="location"]');

  await locationInput.setValue('Spain');
  await wrapper.find('button').trigger();
  await wrapper.vm.$nextTick();

  const currentRoute = wrapper.vm.$route;

  expect(currentRoute.query.location).toBe('Spain');
});
