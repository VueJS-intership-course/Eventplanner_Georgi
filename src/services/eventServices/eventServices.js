import firebaseData from '@/firebase/firebase-config.js';
import { Event } from '@/utils/classes.js';
import uploadImage from '@/utils/imageConvertor.js';
import authServices from '@/services/authServices/authServices.js';

export default {
    async getAll() {
        try {
            const data = [];
            const querySnapshot = await firebaseData.fireStore.collection("events").get();


            querySnapshot.forEach((doc) => {
                const { date, id, imgSrc, location, name, price, ticket, time, country, budget } = doc.data()

                const event = new Event(date, id, imgSrc, location, name, price, ticket, time, budget, country)

                data.push(event);
            });

            return data;

        } catch (error) {
           throw new Error('Error while generating all events!')
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
                imgSrc: blobImg,
                budget: eventData.budget,
                country: eventData.country
            });

            const message = `${eventData.name} event is available on Eventify, check it out and don't miss the chance to buy ticket`
            await authServices.sendAllUsersEmail(message)

        } catch (error) {
            throw new Error('Error while creating new event!')
        }
    },


    async getSingleEvent(eventId) {
        try {
            const eventDoc = await firebaseData.fireStore.collection('events')
                .where('id', '==', eventId)
                .get();

            if (!eventDoc.empty) {
                const eventData = eventDoc.docs[0].data();
                return eventData;
            }

            return null;

        } catch (error) {
            throw new Error('Error while finding current event!')
        }
    },


    async getEventCountryStatitstics() {
        const data = {};
        const querySnapshot = await firebaseData.fireStore.collection("events").get();

        querySnapshot.forEach((doc) => {
            const { country } = doc.data();
            data[country] = (data[country] || 0) + 1;
        });

        const result = Object.entries(data).map(([country, count]) => ({ name: country, value: count }));

        return result;
    },

    async editEvent(event) {
        const querySnapshot = await firebaseData.fireStore
            .collection("events")
            .where("id", "==", event.id)
            .get();

        const doc = querySnapshot.docs[0];

        try {
            await doc.ref.update({
                id: event.id,
                name: event.name,
                ticket: event.ticket,
                price: event.price,
                date: event.date,
                time: event.time,
                imgSrc: event.imgSrc
            });

            const message = `${event.name} information is changed, show details`
            await authServices.sendAllUsersEmail(message)

        } catch (error) {
            throw new Error('Error while editing event, please try again!');
        }
    },



    async deleteEvent(eventId) {
        const querySnapshot = await firebaseData.fireStore
            .collection("events")
            .where("id", "==", eventId)
            .get();
        if (querySnapshot.docs.length > 0) {
            const doc = querySnapshot.docs[0];
            try {
                await doc.ref.delete();
            } catch (error) {
                throw new Error('Error while deleting event, please try again!');
            }
        }
    },

}