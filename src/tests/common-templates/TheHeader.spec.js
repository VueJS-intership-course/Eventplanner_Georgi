import TheHeader from '@/common-templates/TheHeader.vue';
import { mount } from '@vue/test-utils';
import { it, expect } from '@jest/globals';
import { setActivePinia, createPinia } from 'pinia';
import {  createTestingPinia } from '@pinia/testing';

setActivePinia(createPinia())

jest.mock("firebase/app", () => {
    return {
        initializeApp: jest.fn(),
        auth: jest.fn(),
        firestore: jest.fn()
    };
});


const wrapper = mount(TheHeader, {
    global: {
        plugins: [createTestingPinia({
            initialState: {
                authStore: {
                    currentUser: {
                        username:'Georgi',
                        email:'georgi@abv.bg',
                    }
                }
            }
        })],
        stubs:['router-link']
    }
});


it('should not show login and sign up buttons if there is current user',async () => {
    const navControls = wrapper.findAll('.nav-control');

    expect(wrapper.vm.isAuthenticated).toBe(true)
    expect(navControls.length).toBe(3);
    expect(wrapper.find('button').text()).toBe('Logout')
})


it('should show login and sign up buttons if there is no current user',async () => {
    const wrapper = mount(TheHeader, {
        global: {
            plugins: [createTestingPinia({
                initialState: {
                    authStore: {
                        currentUser: null
                    }
                }
            })],
            stubs:['router-link']
        }
    });


    const navControls = wrapper.findAll('.nav-control');

    expect(wrapper.vm.isAuthenticated).toBe(false)
    expect(navControls.length).toBe(4);
})

