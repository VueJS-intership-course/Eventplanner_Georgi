import { defineStore } from "pinia";
import authServices from "../../services/authServices/authServices.js";

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

        async signUp(userData) {
            await authServices.signUp(userData)
        },
        
        async signIn(email, password) {
            await authServices.signIn(email, password)
        },

        async signInWithGoogle() {
            await authServices.signInWIthGoogle()
        },

        async signInWithFacebook(){
            await authServices.signInWithFacebook()
        },

        async logout() {
            localStorage.removeItem('user');
            await authServices.logout();
        }
    }
})