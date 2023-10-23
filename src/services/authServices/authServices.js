import firebaseData from "../../firebase/firebase-config.js";
import { getAuth } from 'firebase/auth'

export default {
    async signUp(user) {
        try {
            const userCredentails = await firebaseData.fireAuth.createUserWithEmailAndPassword(
                user.email,
                password
            );

            if (userCredentails && userCredentails.user) {
                await firebaseData.fireStore
                    .collection("user-profiles")
                    .doc(userCredential.user.uid)
                    .set({
                        email: user.email,
                        username: user.username,
                    });
            }
        } catch (error) {
            console.error('Error while signin up:', error)
            throw error
        }
    },

    async signIn(email, password) {
        try {
            await firebaseData.fireAuth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            throw new Error('Invalid email or password')
        }
    },


    async logout() {
        try {
           await firebaseData.fireAuth.signOut()
        } catch (error) {
            throw error
        }
    }
}