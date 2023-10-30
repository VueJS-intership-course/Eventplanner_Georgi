import { defineStore } from "pinia";
import eventServices from "@/services/eventServices/eventServices.js";

export const eventStore = defineStore('events', {
    state: () => ({
        events: null,
        searchQuery: null,
        filterQuery: {
            startDate: null,
            endDate: null,
            location: '',
            ticketStatus: '',
        },
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
        isAddClicked: false
    }),

    getters: {
        filteredEvents() {
            if (this.searchQuery) {
                return this.events.filter(event => event.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
            }

            return this.events.filter(event => {
                const { startDate, endDate, location, ticketStatus } = this.filterQuery;

                let meetsCriteria = true;

                if (startDate) {
                    meetsCriteria = meetsCriteria && event.date >= startDate;
                }

                if (endDate) {
                    meetsCriteria = meetsCriteria && event.date <= endDate;
                }

                // if (location) {
                //     meetsCriteria = meetsCriteria && event.location.toLowerCase().includes(location.toLowerCase());
                // }

                if (ticketStatus) {
                    meetsCriteria = meetsCriteria && event.ticket > 0;
                }

                return meetsCriteria;
            });
        }
    },

    actions: {
        async getAllEvents() {
            this.events = await eventServices.getAll()
        },

        async addEvent(eventData, file) {
            await eventServices.addEvent(eventData, file);
            this.getAllEvents();
        },

        async getCurrentEvent(eventId) {
            this.currentEvent = await eventServices.getSingleEvent(eventId)
        },

        async deleteEvent(eventId) {
            await eventServices.deleteEvent(eventId)
        },

        filterReset() {
            this.filterQuery = {
                startDate: null,
                endDate: null,
                location: '',
                ticketStatus: '',
            }
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

    }
})