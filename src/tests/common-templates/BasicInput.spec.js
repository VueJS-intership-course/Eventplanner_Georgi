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


it('should handle input of type file correctly', async () => {
    const wrapper = mount(BasicInput, {
        props: {
            name: 'Image',
            type: 'file',
            label: 'Image'
        }
    });

    const file = new File(['hello'], 'hello.jpg', { type: 'image/jpeg' });

    const mockEvent = { target: { files: [file] } };

    await wrapper.vm.handleFileChange(mockEvent);

    expect(wrapper.vm.value).toBeInstanceOf(File)
});

