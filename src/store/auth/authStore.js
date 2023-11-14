import { defineStore } from "pinia";
import authServices from "@/services/authServices/authServices.js";
import firebaseData from "../../firebase/firebase-config";

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
        async authStateChangedPromise() {
            return new Promise((resolve, reject) => {
                const unsubscribe = firebaseData.fireAuth.onAuthStateChanged(async (user) => {
                    if (user) {
                        try {
                            const userData = await authServices.getUserData(user.email);
                            this.setCurrentUser(userData);
                            unsubscribe();
                            resolve(userData);
                        } catch (error) {
                            reject(error);
                        }
                    } else {
                        this.setCurrentUser(null);
                        unsubscribe();
                        resolve(null);
                    }
                });
            });
        },

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

        async changePassword(email, currentPassword, newPassword) {
            await authServices.changePassword(email, currentPassword, newPassword);
        }
    }
})