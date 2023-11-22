import ProfileCard from '@/components/Users/ProfileCard.vue';
import { mount } from '@vue/test-utils';
import { it, expect, describe, beforeEach } from '@jest/globals';
import { createTestingPinia } from '@pinia/testing';
import { createPinia, setActivePinia } from 'pinia';
import authMocks from '@/tests/__mocks__/auth.js';

setActivePinia(createPinia())

describe('Client', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(ProfileCard, {
            global: {
                plugins: [createTestingPinia({
                    initialState: {
                        authStore: {
                            currentUser: authMocks.client
                        }
                    },
                })],
                stubs: ['router-link']
            }
        });
    })


    it('should show client\'s name', () => {
        const usernameHeader = wrapper.find('h5');

        expect(usernameHeader.text()).toBe('Georgi')
    });


    it('should show client\'s email', () => {
        const userEmail = wrapper.find('span');

        expect(userEmail.text()).toBe('georgi@abv.bg');
    });

    it('should show client\'s info', () => {
        const usersInfo = wrapper.findAll('.list-group-item');

        expect(usersInfo.length).toBe(3);
    })

    it('should show the right buttons for client', () => {
        const buttons = wrapper.findAll('.btn');

        expect(buttons.length).toBe(2);

        expect(buttons[0].text()).toBe('Edit profile');
        expect(buttons[1].text()).toBe('Change password');
    })

})


describe('Admin', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(ProfileCard, {
            global: {
                plugins: [createTestingPinia({
                    initialState: {
                        authStore: {
                            currentUser: authMocks.admin
                        }
                    },
                })],
                stubs: ['router-link']
            }
        });
    })


    it('should not show other info for admin', () => {
        const info = wrapper.find('.list-group');
        
        expect(wrapper.vm.isUserAdmin).toBe(true)
        expect(info.exists()).toBe(false)
    })
    
    
    it('should show different buttons for admin', () => {
        const buttons = wrapper.findAll('.btn');

        expect(buttons.length).toBe(2);
        
        expect(buttons[1].text()).toBe('Change password');
    })
})
