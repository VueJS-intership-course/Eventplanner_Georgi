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
        currentEvent:null
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
            await eventServices.addEvent(eventData, file)
        },

        async getCurrentEvent(eventId) {
            this.currentEvent = await eventServices.getSingleEvent(eventId)
        },

        filterReset() {
            this.filterQuery = {
                startDate: null,
                endDate: null,
                location: '',
                ticketStatus: '',
            }
        }
    }
})