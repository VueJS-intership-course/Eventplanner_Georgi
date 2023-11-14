import firebaseData from "@/firebase/firebase-config.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import sendCustomEmail from "@/utils/emailSender.js";

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
          throw new Error('Error while signing up, please try again!')
        }
    },

    async signIn(email, password) {
        try {
            await firebaseData.fireAuth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            throw new Error('Invalid email or password')
        }
    },


    async forgotPassword(email) {
        try {
            await firebaseData.fireAuth.sendPasswordResetEmail(email);
            console.log('Password reset email sent successfully.');
            // Optionally, you can show a success message to the user
        } catch (error) {
            console.error('Error sending password reset email:', error.message);
            // Handle the error, e.g., show an error message to the user
        }
    },


    async signInWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });
    
            const auth = getAuth();
            const result = await signInWithPopup(auth, provider);
    
            const email = result.user.email;
    
            const userExists = await firebaseData.fireStore
                .collection('users')
                .where('email', '==', email)
                .get();
    
            if (userExists.empty) {
                await firebaseData.fireStore.collection('users').add({
                    email: result.user.email,
                    username: result.user.displayName,
                    id: result.user.uid,
                    total: 0,
                    tickets: 0,
                    timeZone: '',
                });
            }
    
        } catch (error) {
            throw new Error('Error while signing up with Google, please try again!');
        }
    },    


    async getUserData(email) {
        try {
            const userDoc = await firebaseData.fireStore.collection('users').where('email', '==', email).get();

            const [doc] = userDoc.docs;

            return doc.data();

        } catch (error) {
            console.error('Error retrieving user data:', error);
            throw error;
        }
    },


    async signInWithFacebook() {
        try {
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
        } catch (error) {
           throw new Error('Error while signing up with Facebook, please try again!')
        }
    },


    async sendAllUsersEmail(message) {
        try {
            const querySnapshot = await firebaseData.fireStore.collection("users").get();

            querySnapshot.forEach(async (doc) => {
                const { email, username } = doc.data();

                sendCustomEmail(email, username, message)
            });

        } catch (error) {
            throw new Error('Error while sending emails!')
        }
    },

    async logout() {
        try {
            await firebaseData.fireAuth.signOut()
        } catch (error) {
            throw new Error('Error while loging out, please try again!')
        }
    },

    async updateUsersProfile(user) {
        try {
            const querySnapshot = await firebaseData.fireStore.collection('users').where('email', '==', user.email).get();
            
            const [doc] = querySnapshot.docs;

            doc.ref.update({
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
           throw new Error('Error while changing password, please try again!')
        }
    },


    async addTicketInformation(user, event) {
        try {
            const querySnapshot = await firebaseData.fireStore.collection('users').where('email', '==', user.email).get();
            
            const [doc] = querySnapshot.docs;
            
            const tickets = doc.data().tickets + 1;
            const total = doc.data().total + event.price;
          
            doc.ref.update({
                tickets,
                total
            })
        } catch (error) {
            throw new Error('Error while updating profile, please try again!')
        }
    }

}