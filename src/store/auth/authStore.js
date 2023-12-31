import { defineStore } from "pinia";
import authServices from "@/services/authServices/authServices.js";

export const authStore = defineStore('authStore', {
    state: () => ({
        currentUser: null,
        isEditing: false,
        isEditPass: false
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

        async signIn(userCredentails) {
            await authServices.signIn(userCredentails)
        },

        async signInWithGoogle() {
            await authServices.signInWithGoogle();
        },

        async signInWithFacebook() {
            await authServices.signInWithFacebook()
        },

        async logout() {
            await authServices.logout();
        },

        async editProfile(user) {
            await authServices.updateUsersProfile(user);
            this.setCurrentUser(await authServices.getUserData(user.email));
        },

        async changePassword(userCredentails) {
            await authServices.changePassword(userCredentails);
        }
    }
})