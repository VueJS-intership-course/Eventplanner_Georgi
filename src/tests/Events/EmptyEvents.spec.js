import EmptyEvents from '@/components/Events/EmptyEvents.vue';
import { it, expect } from '@jest/globals';
import { mount } from '@vue/test-utils';


const wrapper = mount(EmptyEvents, {
    global: {
        stubs: ["router-link"],
    }
});

it('should have empty events text', () => {
    expect(wrapper.text()).toContain('No events found!');
});

it('should have coordianting text for the client', () => {
    expect(wrapper.text()).toContain('Please check again later');
});