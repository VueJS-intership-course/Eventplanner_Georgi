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
    ]
}