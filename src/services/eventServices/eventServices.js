import firebaseData from '@/firebase/firebase-config.js';
import { Event } from '@/utils/classes.js';
import uploadImage from '@/utils/imageConvertor.js';
import authServices from '@/services/authServices/authServices.js';
import { getCountryFromCoords } from '../../utils/countryFromCoordinates';

export default {
    async getAll() {
        try {
            const data = [];
            const querySnapshot = await firebaseData.fireStore
                .collection("events")
                .orderBy("dateTime", "asc")
                .get();

            querySnapshot.forEach((doc) => {
                const { date, id, imgSrc, location, name, price, ticket, country, budget, boughtTickets, expenses, time, dateTime } = doc.data();

                const event = new Event(date, id, imgSrc, location, name, price, ticket, budget, country, boughtTickets, expenses, time, dateTime);

                data.push(event);
            });

            return data;

        } catch (error) {
            throw new Error('Error while generating all events!');
        }
    },



    async addEvent(eventData, file) {
        try {
            const blobImg = await uploadImage(file)

            await firebaseData.fireStore.collection("events").add({
                id: crypto.randomUUID(),
                name: eventData.name,
                ticket: eventData.ticket,
                price: eventData.price,
                dateTime: eventData.dateTime,
                location: eventData.location,
                imgSrc: blobImg,
                budget: eventData.budget,
                country: await getCountryFromCoords(eventData.location),
                date: eventData.date,
                time: eventData.time,
                boughtTickets: [],
                expenses: []
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

            console.log(event);
            await doc.ref.update({
                id: event.id,
                name: event.name,
                ticket: event.ticket,
                price: event.price,
                date: event.date,
                time: event.time,
                country: await getCountryFromCoords(event.location),
                dateTime: event.dateTime
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
        if (querySnapshot.docs.length) {
            const doc = querySnapshot.docs[0];
            try {
                await doc.ref.delete();
            } catch (error) {
                throw new Error('Error while deleting event, please try again!');
            }
        }
    },


    async buyTicket(user, event) {
        const querySnapshot = await firebaseData.fireStore
            .collection("events")
            .where("id", "==", event.id)
            .get();

        const doc = querySnapshot.docs[0];

        try {
            const updatedBoughtTickets = doc.data().boughtTickets;
            const ticket = doc.data().ticket - 1;
            const budget = parseInt(doc.data().budget) + parseInt(event.price);

            updatedBoughtTickets.push({
                email: user.email,
                username: user.username,
                date: Date.now()
            });

            await doc.ref.update({
                boughtTickets: updatedBoughtTickets,
                ticket,
                budget
            });


            await authServices.addTicketInformation(user, event)
        } catch (error) {
            throw new Error('Error while updating boughtTickets, please try again!');
        }
    },


    async addExpense(event, expense) {
        const querySnapshot = await firebaseData.fireStore
            .collection("events")
            .where("id", "==", event.id)
            .get();

        const doc = querySnapshot.docs[0];

        try {
            const expenses = doc.data().expenses;
            const budget = doc.data().budget - expense.amount;

            const existingExpense = expenses.find(e => e.category === expense.category);

            if (existingExpense) {
                existingExpense.amount += expense.amount;
            } else {
                expenses.push({
                    category: expense.category,
                    amount: expense.amount
                });
            }

            doc.ref.update({
                expenses: expenses,
                budget
            });
        } catch (error) {
            throw new Error('Error while adding expense, please try again!');
        }
    }


}