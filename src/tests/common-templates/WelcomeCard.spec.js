import { mount } from '@vue/test-utils';
import WelcomeCard from '@/common-templates/WelcomeCard.vue';

describe('WelcomeCard', () => {
    const wrapper = mount(WelcomeCard, {
        global: {
            stubs: ['RouterLink']
        }
    });

    it('matches snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should have the right title', () => {
        expect(wrapper.text()).toContain('Welcome to Eventify')
    })
});

