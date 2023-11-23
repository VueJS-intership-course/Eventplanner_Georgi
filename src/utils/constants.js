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
    eventsChartCategories:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
}