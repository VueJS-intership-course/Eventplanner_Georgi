import EventCard from '@/components/Events/EventCard.vue';
import { it, expect } from '@jest/globals';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from "@pinia/testing";
import TimeConvertor from '../../plugins/TimeConvertor';
import { authStore } from '../../store/auth/authStore.js'
import { createPinia, setActivePinia } from 'pinia';

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

jest.mock("firebase/app", () => {
    return {
        initializeApp: jest.fn(),
        auth: jest.fn(),
        firestore: jest.fn()
    };
});


const wrapper = mount(EventCard, {
    props: {
        eventData: {
            imgSrc: 'https://firebasestorage.googleapis.com/v0/b/eventsapp-1c1b0.appspot.com/o/products%2Fsubdirectory%2FLili_Ivanova.jpg%2FLili_Ivanova.jpg?alt=media&token=08392fbe-341b-4b8a-af35-b24bdbd664f9',
            name: 'Lili Ivanova Concert',
            date: '2023-12-4',
            country: 'Bulgaria',
            ticket: 50,
            price: 45,
            time: '20:00',
            dateTime: '2023-12-4T20:00:00.000Z',
            location: [23.3694, 42.6715]
        }
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


const store = authStore()

it('should have the right title', () => {
    expect(wrapper.find('.postcard__title').text()).toBe('Lili Ivanova Concert');
})

it('should have the correct img', () => {
    expect(wrapper.find('.postcard__img').element.src).toBe('https://firebasestorage.googleapis.com/v0/b/eventsapp-1c1b0.appspot.com/o/products%2Fsubdirectory%2FLili_Ivanova.jpg%2FLili_Ivanova.jpg?alt=media&token=08392fbe-341b-4b8a-af35-b24bdbd664f9')
})

it('should have the correct country', () => {
    expect(wrapper.findAll('.tag__item').length).toBe(4)
})


it('should show SOLD OUT if there is no tickets available', () => {

    const wrapper = mount(EventCard, {
        props: {
            eventData: {
                imgSrc: 'https://firebasestorage.googleapis.com/v0/b/eventsapp-1c1b0.appspot.com/o/products%2Fsubdirectory%2FLili_Ivanova.jpg%2FLili_Ivanova.jpg?alt=media&token=08392fbe-341b-4b8a-af35-b24bdbd664f9',
                name: 'Lili Ivanova Concert',
                date: '2023-12-4',
                country: 'Bulgaria',
                ticket: 0,
                price: 45,
                time: '20:00',
                dateTime: '2023-12-4T20:00:00.000Z',
                location: [23.3694, 42.6715]
            }
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
    expect(wrapper.findAll('.tag__item').length).toBe(3)
})


