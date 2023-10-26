import firebaseData from '../../firebase/firebase-config.js';
import { Event } from '../../utils/classes.js';
import uploadImage from '../../utils/imageConvertor.js';

export default {
    async getAll() {
        try {
            const data = [];
            const querySnapshot = await firebaseData.fireStore.collection("events").get();


            querySnapshot.forEach((doc) => {
                console.log(doc.data());

                const {date, id, imgSrc, location, name,price, ticket, time} = doc.data()
                
                const event = new Event(date, id, imgSrc, location, name,price, ticket, time)

                data.push(event);
            });

            return data;

        } catch (error) {

            throw error;
        }
    },


    async addEvent(eventData, file) {
        try {
            const blobImg = await uploadImage(file)

            await firebaseData.fireStore.collection("events").add({
                id: crypto.randomUUID(),
                name: eventData.name,
                ticket: eventData.ticket,
                time: eventData.time,
                price: eventData.price,
                date: eventData.date,
                location: eventData.location,
                imgSrc: blobImg
            });

        } catch (error) {

            throw error;
        }
    }
}