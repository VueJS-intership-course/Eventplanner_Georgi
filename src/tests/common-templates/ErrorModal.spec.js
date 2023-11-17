import ErrorModal from '@/common-templates/ErrorModal.vue';
import { mount, shallowMount } from '@vue/test-utils';
import { it, expect } from '@jest/globals';
import TheModal from '@/common-templates/TheModal.vue'

const wrapper = mount(ErrorModal, {
    props: {
        errorMsg: 'Error message',
    },
    global: {
        components: {
            'TheModal': TheModal 
        }
    }
});

it('should show the error message', async () => {
    expect(wrapper.find('.modal-body').text()).toBe('Error message');
});

it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
});

