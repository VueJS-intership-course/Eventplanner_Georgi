import EventSearch from '@/components/Events/Catalog-controls/EventSearch.vue';
import { mount } from '@vue/test-utils';
import { it, expect } from '@jest/globals';

const wrapper = mount(EventSearch, {
  props: {
    modelValue: '',
    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
  }
});

it('should update the model value if input has text', async () => {
  const searchInput = wrapper.find('.form-control');

  await searchInput.setValue('Hello');
  await searchInput.trigger('input');

  expect(wrapper.props('modelValue')).toBe('Hello');
});
