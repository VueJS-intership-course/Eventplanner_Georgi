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
        filteredEvents() {
            const query = this.router.currentRoute.value.query;

            if (this.searchQuery) {
                return this.events.filter(event => event.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
            }

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
            const data = {};

            for (let i = 0; i <= 11; i++) {
                data[i] = 0;
            }

            state.events.forEach(event => {
                const monthKey = moment.utc(event.boughtTickets.date).month();
                data[monthKey] += 1;
            });

            const chartData = Object.entries(data).map(([key, value]) => [parseInt(key), value]);

            return {
                name: 'Tickets',
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            console.dir(this);
                        },
                    }
                },
                data: chartData
            }
        },

        getAllEventsDates(state) {
            const data = {};

            for (let i = 0; i <= 11; i++) {
                data[i] = 0;
            }

            state.events.forEach(event => {
                const monthKey = moment.utc(event.date).month();
                data[monthKey] += 1;
            });

            const chartData = Object.entries(data).map(([key, value]) => [parseInt(key), value]);

            return {
                name: 'Events',
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            console.dir(this);
                        },
                    }
                },
                data: chartData
            }
        },


        getFullAnalytics() {
            return [this.getAllTicketsInfo, this.getAllEventsDates];
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
            await eventServices.addExpense(event, expense)
        }

    }
})