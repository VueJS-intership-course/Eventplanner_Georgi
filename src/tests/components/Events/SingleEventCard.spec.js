import SingleEventCard from '@/components/Events/SingleEvent/SingleEventCard.vue';
import { expect, it } from '@jest/globals';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { createPinia, setActivePinia } from 'pinia';
import { useRouter } from 'vue-router';
import TimeConvertor from '@/plugins/TimeConvertor.js';
import eventsMocks from '@/tests/__mocks__/events.js';
import authMocks from '@/tests/__mocks__/auth.js';

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


const push = jest.fn()
useRouter.mockImplementationOnce(() => ({
    push
}))


jest.mock('moment-timezone', () => {
    const originalMoment = jest.requireActual('moment-timezone');

    return {
        ...originalMoment,
        tz: jest.fn(() => ({
            format: jest.fn((formatString) => `Mocked formatted time using format string: ${formatString}`),
            tz: jest.fn(() => ({
                format: jest.fn((formatString) => `Mocked formatted time using format string: ${formatString}`),
            })),
        })),
        utc: jest.fn(() => ({
            tz: jest.fn(() => ({
                format: jest.fn((formatString) => `Mocked formatted time using format string: ${formatString}`)
            })),
            local: jest.fn(() => ({
                format: jest.fn((formatString) => `Mocked formatted time using format string: ${formatString}`)
            }))
            
        }))
    };
});

describe('Event specific data', () => {
    describe('Events with available tickets', () => {
        const wrapper = mount(SingleEventCard, {
            global: {
                stubs: ['router-link', 'ErrorModal'],
                plugins: [TimeConvertor, createTestingPinia({
                    initialState: {
                        events: {
                            currentEvent: eventsMocks.eventWithTickets
                        },
                        authStore: {
                            currentUser: authMocks.client
                        }
                    }
                })]
            }
        });
   
        it('should show events name', () => {
            expect(wrapper.find('.card-title').text()).toBe('Lili Ivanova Concert')
        })

        it('should show the right image', () => {
            expect(wrapper.find('img').attributes('src')).toBe('https://firebasestorage.googleapis.com/v0/b/eventsapp-1c1b0.appspot.com/o/products%2Fsubdirectory%2FLili_Ivanova.jpg%2FLili_Ivanova.jpg?alt=media&token=08392fbe-341b-4b8a-af35-b24bdbd664f9')
        })

        it('should show the correct information', () => {
            const infoList = wrapper.findAll('li');

            expect(infoList.length).toBe(3);
            expect(infoList[0].text()).toBe('Country: Bulgaria');
            expect(infoList[1].text()).toBe('Tickets available: 50');
            expect(infoList[2].text()).toBe('Ticket price: 45$');
        })
    });


    describe('Events with SOLD tickets', () => {
        const wrapper = mount(SingleEventCard, {
            global: {
                stubs: ['router-link', 'ErrorModal'],
                plugins: [TimeConvertor, createTestingPinia({
                    initialState: {
                        events: {
                            currentEvent: eventsMocks.eventWithNoTickets
                        },
                        authStore: {
                            currentUser: authMocks.client
                        }
                    }
                })]
            }
        });

        it('should not show tickets information if SOLD out', () => {
            expect(wrapper.vm.hasTicketsAvailable).toBe(false)
            expect(wrapper.text()).not.toContain('Tickets available:')
            expect(wrapper.text()).not.toContain('Ticket price:')
        })

        it('should show the correct information for SOLD tickets', () => {
            const infoList = wrapper.findAll('li');

            expect(infoList.length).toBe(2);
            expect(infoList[0].text()).toBe('Country: Bulgaria');
            expect(infoList[1].text()).toBe('SOLD OUT!');
        })
    })

})


describe('Client specific', () => {

    const wrapper = mount(SingleEventCard, {
        global: {
            stubs: ['router-link', 'ErrorModal'],
            plugins: [TimeConvertor, createTestingPinia({
                initialState: {
                    events: {
                        currentEvent: eventsMocks.eventWithTickets
                    },
                    authStore: {
                        currentUser: authMocks.client
                    }
                }
            })]
        }
    })


    it('should show only "Buy Ticket" button if user is not admin', async () => {
        expect(wrapper.find('button').text()).toBe('Buy Ticket');
        expect(wrapper.findAll('button').length).toBe(1)
    })

 
})


describe('Client with already bought ticket', () => {
    const wrapper = mount(SingleEventCard, {
        global: {
            stubs: ['router-link', 'ErrorModal'],
            plugins: [TimeConvertor, createTestingPinia({
                initialState: {
                    events: {
                        currentEvent: eventsMocks.eventWithUserBoughtTicket
                    },
                    authStore: {
                        currentUser: authMocks.client
                    }
                }
            })],
        }
    });


    it('should show "You already bought ticket" text', () => {
        expect(wrapper.text()).toContain('You have already bought ticket for this event!')
    })
})



describe('Admin specific', () => {
    const wrapper = mount(SingleEventCard, {
        global: {
            stubs: ['router-link', 'ErrorModal'],
            plugins: [TimeConvertor, createTestingPinia({
                initialState: {
                    events: {
                        currentEvent: eventsMocks.eventWithTickets,
                        isAddExpense: false
                    },
                    authStore: {
                        currentUser: authMocks.admin
                    }
                }
            })]
        }
    });

    it('Should not show buy ticket for Admin', () => {
        expect(wrapper.text()).not.toContain('Buy Ticket')
    });

    it('Should show Add Expense, Edit and Delete buttons for adming', () => {
        const adminButtons = wrapper.findAll('button');

        expect(adminButtons[0].text()).toBe('Add Expense');
        expect(adminButtons[1].text()).toBe('Edit');
        expect(adminButtons[2].text()).toBe('Delete');
    });

    it('should open the Add Expense Modal', async () => {
        const adminButtons = wrapper.findAll('button');

        await adminButtons[0].trigger('click');

        expect(wrapper.vm.store.isAddExpense).toBe(true)
    })
})


describe('Non Registered User', () => {
    const wrapper = mount(SingleEventCard, {
        global: {
            stubs: ['router-link', 'ErrorModal'],
            plugins: [TimeConvertor, createTestingPinia({
                initialState: {
                    events: {
                        currentEvent: eventsMocks.eventWithTickets,
                        isAddExpense: false
                    },
                    authStore: {
                        currentUser: null
                    }
                }
            })]
        }
    });


    it('should not show buttons for non registered user', () => {
        const buttons = wrapper.findAll('button');

        expect(buttons.length).toBe(0);
    })
})