import { TicketModel } from "./Model";
import { log } from "util";
log("IN EXPIRY");
let expiredTickets = [];
let ticketEndingInterval = setInterval(() => {
  TicketModel.find()
    .then(tickets => {
      expiredTickets = [];
      tickets.forEach(ticket => {
        if (Date.parse(ticket.duration[1]) >= Date.now()) {
          expiredTickets.push(ticket);
        }
      });
      log(expiredTickets.length);
    })
    .catch(err => {
      log("ERR IN TICKETS", err);
    });
}, 1000 * 60 * 60 * 6);
