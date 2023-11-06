export class Event {
    constructor(date, id, imgSrc, location, name, price, ticket, budget, country, boughtTIckets, expenses, time, dateTime) {
        this.date = date;
        this.id = id;
        this.imgSrc = imgSrc;
        this.location = location;
        this.name = name;
        this.price = price;
        this.time = time;
        this.ticket = ticket;
        this.budget = budget;
        this.dateTime = dateTime
        this.country = country;
        this.boughtTickets = boughtTIckets;
        this.expenses = expenses;
    }
}