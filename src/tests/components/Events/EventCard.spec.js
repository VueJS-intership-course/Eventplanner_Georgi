import EventCard from '@/components/Events/Catalog/EventCard.vue';
import { it, expect } from '@jest/globals';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from "@pinia/testing";
import TimeConvertor from '@/plugins/TimeConvertor.js';
import { authStore } from '@/store/auth/authStore.js'
import { createPinia, setActivePinia } from 'pinia';
import eventsMocks from '@/tests/__mocks__/events.js';

setActivePinia(createPinia())

const mockApp = {
    use: jest.fn(),
    config: {
        globalProperties: {
            formatDateInTimeZone: jest.fn()
        },
    }
}

TimeConvertor.install(mockApp);

const wrapper = mount(EventCard, {
    props: {
        eventData: eventsMocks.eventWithTickets
    },
    global: {
        stubs: ['router-link'],
        plugins: [TimeConvertor, createTestingPinia({
            initialState: {
                authStore: authStore()
            },
        })],
    }
})
jest.mock('moment-timezone', () => {
    const originalMoment = jest.requireActual('moment-timezone');

    return {
        ...originalMoment,
        tz: jest.fn(() => ({
            format: jest.fn((formatString) => `Mocked formatted time using format string: ${formatString}`),
        })),
        utc: jest.fn(() => ({
            format: jest.fn((formatString) => `Mocked formatted time using format string: ${formatString}`),
        }))
    };
});



it('should have the right title', () => {
    expect(wrapper.find('.postcard__title').text()).toBe('Lili Ivanova Concert');
})

it('should have the correct img', () => {
    const eventImage = wrapper.find('.postcard__img')

    expect(eventImage.attributes('src')).toBe('https://firebasestorage.googleapis.com/v0/b/eventsapp-1c1b0.appspot.com/o/products%2Fsubdirectory%2FLili_Ivanova.jpg%2FLili_Ivanova.jpg?alt=media&token=08392fbe-341b-4b8a-af35-b24bdbd664f9')
    expect(eventImage.attributes('alt')).toBe('Lili Ivanova Concert')
})

it('should have the correct country', () => {
   const eventInformation = wrapper.findAll('.tag__item');

    expect(eventInformation.length).toBe(4)
})


it('should show SOLD OUT and not show tickets information if there is no tickets available', () => {

    const wrapper = mount(EventCard, {
        props: {
            eventData: eventsMocks.eventWithNoTickets
        },
        global: {
            stubs: ['router-link'],
            plugins: [TimeConvertor, createTestingPinia({
                initialState: {
                    usersStore: authStore()
                },
            })],
        }
    })
    
    const eventInformation = wrapper.findAll('.tag__item');


    expect(eventInformation.length).toBe(3);
    expect(wrapper.text()).toContain('SOLD OUT!');
});




