import firebaseData from "../../firebase/firebase-config.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { collection, query, where, getDocs } from 'firebase/firestore';
import sendCustomEmail from "../../utils/emailSender.js";

export default {
    async signUp(user) {
        console.log(user)
        try {
            const userCredentails = await firebaseData.fireAuth.createUserWithEmailAndPassword(
                user.email,
                user.password
            );

            if (userCredentails && userCredentails.user) {
                await firebaseData.fireStore
                    .collection("users")
                    .doc(userCredentails.user.uid)
                    .set({
                        email: user.email,
                        username: user.username,
                        timeZone: user.timeZone
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


    async signInWIthGoogle() {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        const auth = getAuth();

        signInWithPopup(auth, provider)
            .then(async (result) => {
                const user = result.user;

                await firebaseData.fireStore.collection('users').add({
                    email: user.email,
                    username: user.displayName,
                    id: user.uid
                })
            }).catch((error) => {
                throw error
            });
    },


    async getUserData(userId) {
        try {
            const userDoc = await firebaseData.fireStore.collection('users').doc(userId).get();

            const userData = userDoc.data();

            return userData;

        } catch (error) {
            console.error('Error retrieving user data:', error);
            throw error;
        }
    },


    signInWithFacebook() {
        const provider = new FacebookAuthProvider();
        const auth = getAuth();


        signInWithPopup(auth, provider)
            .then(async (result) => {
                const user = result.user;

                await firebaseData.fireStore.collection('users').add({
                    email: user.email,
                    username: user.displayName,
                    id: user.uid
                })

            })
            .catch((error) => {
                throw error
            });
    },


    async sendAllUsersEmail() {
        try {
            const querySnapshot = await firebaseData.fireStore.collection("users").get();

            querySnapshot.forEach(async (doc) => {
                const {email, username } = doc.data();
                  
                sendCustomEmail(email, username)
            });

        } catch (error) {
            console.error("Error fetching user profiles:", error);
            throw error;
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