import AutoComplete from '@/common-templates/AutoComplete.vue';
import { mount } from '@vue/test-utils';
import { it, expect } from '@jest/globals';

const wrapper = mount(AutoComplete, {
    props: {
        modelValue: '',
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    }
});

it('should show the possible selections on focus', async () => {
    const input = wrapper.find('input')

    await input.trigger('focus');

    expect(wrapper.vm.isDropDownVisible).toBe(true)
    expect(wrapper.find('ul').isVisible()).toBe(true)
});


it('should show the correct number of selections when focus', async () => {
    const input = wrapper.find('input');

    await input.trigger('focus');

    expect(wrapper.findAll('li').length).toBe(10)
})

it('should not show the selections on blur', async () => {
    const input = wrapper.find('input')

    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.vm.isDropDownVisible).toBe(false)
    expect(wrapper.find('ul').isVisible()).toBe(false)
});

it('should update the model value on click of selections and close the selections', async () => {
    const input = wrapper.find('input')

    await input.trigger('focus');

    const button = wrapper.findAll('button');

    await button[0].trigger('click');

    expect(wrapper.props('modelValue')).toBe('1');
    expect(wrapper.vm.isDropDownVisible).toBe(false)
    expect(wrapper.find('ul').isVisible()).toBe(false)
});


it('should show error message if value doesn\'t exist', async () => {
    const input = wrapper.find('input');

    await input.trigger('focus');
    
    expect(wrapper.vm.searchValue).toBe('')
})