import NotFound from '@/pages/notFound/notFound.vue';
import { mount } from '@vue/test-utils';
import {expect, it} from '@jest/globals';

const wrapper = mount(NotFound, {
    global: {
        stubs:['router-link']
    }
});

it('should have the correct request status', () => {
    expect(wrapper.find('h1').text()).toBe('404')
})

it('should have the "Page not found" text', () => {
    expect(wrapper.text()).toContain('Page not found.')
})

it('should tell the user that the page doesn\'t exists', () => {
    expect(wrapper.find('.lead').text()).toBe('The page you’re looking for doesn’t exist.')
})

it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
})