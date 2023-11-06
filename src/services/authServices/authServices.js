import firebaseData from "../../firebase/firebase-config.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import sendCustomEmail from "../../utils/emailSender.js";

export default {
    async signUp(user) {
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
                        timeZone: user.timeZone,
                        tickets: 0,
                        total:0
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
        try {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });

            const auth = getAuth();

            const result = await signInWithPopup(auth, provider)


            await firebaseData.fireStore.collection('users').add({
                email: result.user.email,
                username: result.user.displayName,
                id: result.user.uid,
                total:0,
                tickets:0,
                timeZone: '',
            })
        } catch (error) {
            console.error(error);
            throw error
        }
    },


    async getUserData(email) {
        try {
            const userDoc = await firebaseData.fireStore.collection('users').where('email', '==', email).get();

            const userData = userDoc.docs[0].data();

            return userData;

        } catch (error) {
            console.error('Error retrieving user data:', error);
            throw error;
        }
    },


    async signInWithFacebook() {
        const provider = new FacebookAuthProvider();
        const auth = getAuth();


        const result = await signInWithPopup(auth, provider);


        await firebaseData.fireStore.collection('users').add({
            email: result.user.email,
            username: result.user.displayName,
            id: result.user.uid,
            total:0,
            tickets:0,
            timeZone: ''
        })
    },


    async sendAllUsersEmail(message) {
        try {
            const querySnapshot = await firebaseData.fireStore.collection("users").get();

            querySnapshot.forEach(async (doc) => {
                const { email, username } = doc.data();

                sendCustomEmail(email, username, message)
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
    },

    async updateUsersProfile(user) {
        try {
            const querySnapshot = await firebaseData.fireStore.collection('users').where('email', '==', user.email).get();
            
            const userDoc = querySnapshot.docs[0];

            userDoc.ref.update({
               username:user.username,
               timeZone:user.timeZone
            })
        } catch (error) {
            throw new Error('Error while updating profile, please try again!')
        }
    },

    async changePassword(email, currentPassword, newPassword) {
        try {
            const user = firebaseData.fireAuth.currentUser;

            if (user) {
                const credential = EmailAuthProvider.credential(email, currentPassword);
                await reauthenticateWithCredential(user, credential);

                await updatePassword(user, newPassword);

                await this.logout()
            } else {
                throw new Error("User is not authenticated or found.");
            }
        } catch (error) {
            console.error("Error changing password:", error);
            throw error;
        }
    },


    async addTicketInformation(user, event) {
        try {
            const querySnapshot = await firebaseData.fireStore.collection('users').where('email', '==', user.email).get();
            
            const userDoc = querySnapshot.docs[0];
            
            const tickets = userDoc.data().tickets + 1;
            const total = userDoc.data().total + event.price;
          
            userDoc.ref.update({
                tickets,
                total
            })
        } catch (error) {
            throw new Error('Error while updating profile, please try again!')
        }
    }

}