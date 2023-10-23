import { defineStore } from "pinia";

export const authStore = defineStore('authStore', {
    state: () => ({
        currentUser: null
    }),

    actions: {
        setCurrentUser(user) {
            this.currentUser = user;
        },
    }
})