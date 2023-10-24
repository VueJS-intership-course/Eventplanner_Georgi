import { defineStore } from "pinia";

export const authStore = defineStore('authStore', {
    state: () => ({
        currentUser: null
    }),

    getters: {
        isCurrentUserEmpty(state) {
            return state.currentUser !== null
        }
    },

    actions: {
        setCurrentUser(user) {
            this.currentUser = user;
        },
    }
})