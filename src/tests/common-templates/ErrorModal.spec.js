import ErrorModal from '@/common-templates/ErrorModal.vue';
import { mount } from '@vue/test-utils';
import { it, expect } from '@jest/globals';

const wrapper = mount(ErrorModal, {
    props: {
        errorMsg: 'Error message',
    }
});

it('should show the error message', async () => {
    expect(wrapper.find('.modal-body').text()).toBe('Error message');
});

