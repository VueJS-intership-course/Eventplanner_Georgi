import { defineStore } from "pinia";
import eventServices from "@/services/eventServices/eventServices.js";
import moment from "moment";

export const eventStore = defineStore('events', {
    state: () => ({
        events: null,
        searchQuery: null,
        editedEvent: {
            name: '',
            ticket: '',
            time: '',
            price: '',
            date: '',
            location: '',
            imgSrc: '',
            budget: '',
            country: '',
        },

        isEditing: false,
        currentEvent: null,
        eventStatistic: null,
        isAddClicked: false,
        isFiltering: false,
        isAddExpense: false
    }),

    getters: {
        searchedEvents() {
            const filteredEvents = this.filteredEvents;

            if (this.searchQuery) {
                return filteredEvents.filter(event => event.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
            }

            return filteredEvents;
        },

        filteredEvents() {
            const query = this.router.currentRoute.value.query;

            return this.events.filter(event => {
                const { startDate, endDate, location, ticketStatus } = query;
                let meetsCriteria = true;

                if (startDate) {
                    meetsCriteria = meetsCriteria && event.date >= startDate;
                }

                if (endDate) {
                    meetsCriteria = meetsCriteria && event.date <= endDate;
                }

                if (location) {
                    meetsCriteria = meetsCriteria && event.country.toLowerCase().includes(location.toLowerCase());
                }

                if (ticketStatus) {
                    meetsCriteria = meetsCriteria && event.ticket > 0;
                }

                return meetsCriteria;
            });
        },


        hasUserBoughTicket(state) {
            return (userEmail) => {
                return state.currentEvent.boughtTickets.some(ticket => ticket.email === userEmail);
            }
        },

        usersEvent(state) {
            return (userEmail) => {
                if (state.events) {
                    const userEvents = state.events.filter(event => {
                        const hasEmail = event.boughtTickets.some(ticket => ticket.email === userEmail);
                        return hasEmail;
                    });

                    return userEvents.map(event => ({ title: event.name, start: event.date, url: `/catalog/event/${event.id}` }));
                }

                return null;
            }
        },

        getAllTicketsInfo(state) {
            const data = state.events.reduce((result, event) => {
                const monthKey = moment.utc(event.boughtTickets.date).month();
                result[monthKey] = (result[monthKey] || 0) + 1;
                return result;
            }, {});

            return {
                name: 'Tickets',
                type: 'column',
                data: Object.entries(data).map(([key, value]) => [parseInt(key), value]),
            };
        },

        getAllEventsDates(state) {
            const data = state.events.reduce((result, event) => {
                const monthKey = moment.utc(event.date).month();
                result[monthKey] = (result[monthKey] || 0) + 1;
                return result;
            }, {});

            return {
                name: 'Events',
                type: 'column',
                data: Object.entries(data).map(([key, value]) => [parseInt(key), value]),
            };
        },

        getFullAnalytics() {
            return [this.getAllTicketsInfo, this.getAllEventsDates];
        },


        singleEventAnalytics() {
            return [{
                name: 'Expenses',
                type: 'pie',
                data: this.currentEvent.expenses.map(expense => ({
                    name: expense.category,
                    y: expense.amount
                }))
            }];
        }

    },

    actions: {
        async getAllEvents() {
            this.events = await eventServices.getAll();
        },

        async addEvent(eventData, file) {
            await eventServices.addEvent(eventData, file);
            this.getAllEvents();
        },

        async getCurrentEvent(eventId) {
            this.currentEvent = await eventServices.getSingleEvent(eventId);
        },

        async deleteEvent(eventId) {
            await eventServices.deleteEvent(eventId);
        },

        filterReset() {
            this.router.push({ query: {} });
        },

        setEditedEvent() {
            this.editedEvent = this.currentEvent
        },

        resetEditedEvent() {
            this.editedEvent = {
                name: '',
                ticket: '',
                time: '',
                price: '',
                date: '',
                location: '',
                imgSrc: '',
                budget: '',
            }
        },

        async getStatistics() {
            this.eventStatistic = await eventServices.getEventCountryStatitstics()
        },

        async editEvent(editEvent) {
            await eventServices.editEvent(editEvent);
            await this.getCurrentEvent(editEvent.id)
            this.resetEditedEvent();
        },

        closeModal() {
            this.isEditing = false
        },

        closeAdd() {
            this.isAddClicked = false;
        },

        closeFilter() {
            this.isFiltering = false;
        },


        async handleBuyTicket(user, event) {
            await eventServices.buyTicket(user, event);
            this.getCurrentEvent(event.id)
        },


        async addExpense(event, expense) {
            await eventServices.addExpense(event, expense);

            this.getCurrentEvent(event.id)
        }

    }
})