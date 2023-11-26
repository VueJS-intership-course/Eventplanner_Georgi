import moment from "moment-timezone";

export default {
    allTimeZones: moment.tz.names(),
    expenseOptions: [
        {
            value: 'rent',
            label: 'Rent place'
        },
        {
            value: 'food',
            label: 'Food'
        },
        {
            value: 'logistics',
            label: 'Logistics'
        }
    ],
    eventsChartCategories:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    defaultUserImage: 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
}