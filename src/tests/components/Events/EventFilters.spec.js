import EventSearch from '@/components/Events/Catalog-controls/EventsFilter.vue';
import { mount } from '@vue/test-utils';
import { it, expect } from '@jest/globals';
import { eventStore } from '@/store/events/eventStore.js'
import { createTestingPinia } from '@pinia/testing';
import { createPinia, setActivePinia } from 'pinia';
import { useRouter } from 'vue-router'
import TheModal from '@/common-templates/TheModal.vue'


setActivePinia(createPinia());


const push = jest.fn()
useRouter.mockImplementationOnce(() => ({
    push
}))

let wrapper;

beforeEach(() => {
    wrapper = mount(EventSearch, {
        global: {
            plugins: [createTestingPinia({
                initialState: {
                    eventStore: eventStore()
                },
            })],
            components: {
                'TheModal': TheModal
            }
        },
    });
})

jest.mock("firebase/app", () => {
    return {
        initializeApp: jest.fn(),
        auth: jest.fn(),
        firestore: jest.fn(),
    };
});



it('should trigger the handle filters', async () => {
    const handleFilters = jest.spyOn(wrapper.vm, 'handleFilters');
    const locationInput = wrapper.find('input[name="location"]');

    await locationInput.setValue('Spain');
    await wrapper.find('button').trigger('submit');
    await wrapper.vm.$nextTick();


    expect(handleFilters).toBeCalled()
})


it('should handle filters correctly', async () => {
    const locationInput = wrapper.find('input[name="location"]');

    await locationInput.setValue('Spain');
    await wrapper.find('button').trigger('submit');
    await wrapper.vm.$nextTick();


    expect(push).toBeCalled();
    expect(push).toBeCalledTimes(1)
});


