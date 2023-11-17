import ChangePassword from '@/components/Users/ChangePassword.vue';
import { mount, shallowMount } from '@vue/test-utils';
import { it, expect } from '@jest/globals';
import { createPinia, setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';

setActivePinia(createPinia());


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
      push: () => {}
    }))
  }))
  


describe('ChangePassword.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(ChangePassword, {
            global: {
                plugins: [createTestingPinia({
                    initialState: {
                        authStore: {
                            isEditPass: true
                        }
                    },
                })],
                stubs: ['ErrorModal', 'BasicInput']
            }
        });
    })
    it('handles change password form submission', async () => {
        await wrapper.find('form').trigger('submit.prevent');

        expect(wrapper.vm.errorMsg).toBeNull();
    });

    
});