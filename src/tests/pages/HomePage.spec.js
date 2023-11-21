import HomePage from '@/pages/home/HomePage.vue';
import { mount, shallowMount } from '@vue/test-utils';
import {expect, it} from '@jest/globals'
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia, createPinia } from 'pinia';

setActivePinia(createPinia())

jest.mock("firebase/app", () => {
    return {
        initializeApp: jest.fn(),
        auth: jest.fn(),
        firestore: jest.fn(),
    };
});


jest.mock('vue-router', () => ({
    useRoute: jest.fn(() => ({
        query: {}
    })),
    useRouter: jest.fn(() => ({
        push: () => { }
    }))
}))


const wrapper = shallowMount(HomePage, {
    global: {
        plugins:[createTestingPinia({
            initialState: {
                events: {
                    events: ['1', '2']
                }
            }
        })]
    }
})


it('should call all the methods for generating events and map statistics', () => {
    expect(wrapper.vm.store.getAllEvents).toBeCalled();
})

