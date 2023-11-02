export class Event {
    constructor(date, id, imgSrc, location, name, price, ticket, budget, country, boughtTIckets, expenses) {
        this.date = date;
        this.id = id;
        this.imgSrc = imgSrc;
        this.location = location;
        this.name = name;
        this.price = price;
        this.ticket = ticket;
        this.budget = budget;
        this.country = country;
        this.boughtTickets = boughtTIckets;
        this.expenses = expenses
    }
}