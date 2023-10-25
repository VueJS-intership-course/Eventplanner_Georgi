import { defineStore } from "pinia";
import eventServices from "@/services/eventServices/eventServices.js";

export const eventStore = defineStore('events', {
    state: () => ({
        events: null
    }),


    actions: {
        async getAllEvents() {
            this.events = await eventServices.getAll()
        },

        async addEvent(eventData, file) {
            await eventServices.addEvent(eventData, file)
        }
    }
})