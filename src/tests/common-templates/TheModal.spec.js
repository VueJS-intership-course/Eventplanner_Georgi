import TheModal from '@/common-templates/TheModal.vue';
import { mount } from '@vue/test-utils';

const wrapper = mount(TheModal);

it('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
})