import { defineStore } from "pinia";

export const authStore = defineStore('authStore', {
    state: () => ({
        currentUser: null
    }),

    getters: {
        isCurrentUserEmpty(state) {
            return state.currentUser !== null
        },

        isCurrentUserAdmin(state) {
            return state.currentUser !== null ? state.currentUser.isAdmin : false
        }
    },

    actions: {
        setCurrentUser(user) {
            this.currentUser = user;
        },
    }
})