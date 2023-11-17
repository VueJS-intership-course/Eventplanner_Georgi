import { mount } from '@vue/test-utils';
import WelcomeCard from '@/common-templates/WelcomeCard.vue';

describe('WelcomeCard', () => {
  it('matches snapshot', () => {
    const wrapper = mount(WelcomeCard);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should have the right title', () => {
    const wrapper = mount(WelcomeCard);
    expect(wrapper.text()).toContain('Welcome to Eventify')
  })
});

