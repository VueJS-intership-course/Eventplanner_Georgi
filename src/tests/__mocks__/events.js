export default {
    eventWithTickets: {
        imgSrc: 'https://firebasestorage.googleapis.com/v0/b/eventsapp-1c1b0.appspot.com/o/products%2Fsubdirectory%2FLili_Ivanova.jpg%2FLili_Ivanova.jpg?alt=media&token=08392fbe-341b-4b8a-af35-b24bdbd664f9',
        name: 'Lili Ivanova Concert',
        date: '2023-12-4',
        country: 'Bulgaria',
        ticket: 50,
        price: 45,
        time: '20:00',
        dateTime: '2023-12-4T20:00:00.000Z',
        location: [23.3694, 42.6715],
        boughtTickets: []
    },

    eventWithNoTickets: {
        imgSrc: 'https://firebasestorage.googleapis.com/v0/b/eventsapp-1c1b0.appspot.com/o/products%2Fsubdirectory%2FLili_Ivanova.jpg%2FLili_Ivanova.jpg?alt=media&token=08392fbe-341b-4b8a-af35-b24bdbd664f9',
        name: 'Lili Ivanova Concert',
        date: '2023-12-4',
        country: 'Bulgaria',
        ticket: 0,
        price: 45,
        time: '20:00',
        dateTime: '2023-12-4T20:00:00.000Z',
        location: [23.3694, 42.6715],
        boughtTickets: []
    },

    eventWithUserBoughtTicket: {
        imgSrc: 'https://firebasestorage.googleapis.com/v0/b/eventsapp-1c1b0.appspot.com/o/products%2Fsubdirectory%2FLili_Ivanova.jpg%2FLili_Ivanova.jpg?alt=media&token=08392fbe-341b-4b8a-af35-b24bdbd664f9',
        name: 'Lili Ivanova Concert',
        date: '2023-12-4',
        country: 'Bulgaria',
        ticket: 0,
        price: 45,
        time: '20:00',
        dateTime: '2023-12-4T20:00:00.000Z',
        location: [23.3694, 42.6715],
        boughtTickets: [{email: 'georgi@abv.bg'}]
    }
}