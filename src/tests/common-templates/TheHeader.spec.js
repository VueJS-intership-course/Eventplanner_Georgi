import TheHeader from '@/common-templates/TheHeader.vue';
import { mount } from '@vue/test-utils';
import { it, expect } from '@jest/globals';
import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import authMocks from '@/tests/__mocks__/auth.js';
import firebase from 'firebase/compat';

setActivePinia(createPinia())


jest.mock("firebase/app", () => {
    return {
        initializeApp: jest.fn(),
        auth: jest.fn(),
        firestore: jest.fn()
    };
});



jest.mock('vue-router', () => ({
    useRoute: jest.fn(),
    useRouter: jest.fn(() => ({
        push: () => { }
    }))
}))

describe('Client', () => {
    const wrapper = mount(TheHeader, {
        global: {
            plugins: [createTestingPinia({
                initialState: {
                    authStore: {
                        currentUser: authMocks.client
                    }
                }
            })],
            stubs: ['router-link']
        }
    });


    it('should not show login and sign up buttons if there is current user', async () => {
        const navControls = wrapper.findAll('.nav-control');

        expect(wrapper.vm.isAuthenticated).toBe(true)
        expect(navControls.length).toBe(3);
        expect(wrapper.find('button').text()).toBe('Logout')
    })


    it('should trigger the right event when sign out',async () => {
        const signOutBtn = wrapper.find('button');

        await signOutBtn.trigger("click");

        expect(wrapper.vm.store.logout).toBeCalled()
    })
})


it('should show login and sign up buttons if there is no current user', async () => {
    const wrapper = mount(TheHeader, {
        global: {
            plugins: [createTestingPinia({
                initialState: {
                    authStore: {
                        currentUser: null
                    }
                }
            })],
            stubs: ['router-link']
        }
    });


    const navControls = wrapper.findAll('.nav-control');

    expect(wrapper.vm.isAuthenticated).toBe(false)
    expect(navControls.length).toBe(4);
    
})


