import BasicInput from '@/common-templates/BasicInput.vue';
import { mount } from '@vue/test-utils';
import { it, expect } from '@jest/globals';


it('should be normal input if the type is not a select', () => {
    const wrapper = mount(BasicInput, {
        props: {
            name: 'username',
            type: 'text',
            label: 'Username',
            placeholder: 'Write down your username'
        }
    })
    
    expect(wrapper.find('input[placeholder="Write down your username"]').exists()).toBe(true);
    expect(wrapper.find('label').text()).toBe('Username:');
});

it('should be select if type is select with select options', () => {
    const wrapper = mount(BasicInput, {
        props: {
            name: 'timeZone',
            type: 'select',
            label: 'Time Zone',
            selectOptions: ['africa', 'europe', 'asia']
        }
    })
    
    expect(wrapper.find('select').exists()).toBe(true);
    expect(wrapper.findAll('option').length).toBe(3)
})

