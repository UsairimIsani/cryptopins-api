import { TicketModel } from "./Model";
import { log, axios, Data } from "../../util";
export const getAllTickets = (req, res, next) => {
  TicketModel.find({})
    .then((tickets) => {
      res.json({
        data: tickets,
        success: true,
        message: "Successfully Fetched All Tickets!",
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: "Couldn't Find any Tickets",
        data: null,
      });
    });
};
export const createTicket = (req, res, next) => {
  log(req.body);

  TicketModel.create({ ...req.body })
    .then((Ticket) => {
      let checkout = {
        name: `Ticket No ${Ticket._id}`,
        description: `Buy in to  Crytopins' Ticket no ${Ticket._id}`,
        local_price: {
          amount: Ticket.buyInPrice.amount * 1000000,
          currency: "USD",
        },
        pricing_type: "fixed_price",
      };
      axios
        .post("checkouts", checkout)
        .then((checkoutRes) => {
          log("checkoutRes.data", checkoutRes.data);
          Ticket.update({ checkout: checkoutRes.data })
            .then((TicketUpdated) => {
              res.json(
                new Data(true, "New Ticket created Successfully", Ticket),
              );
            })
            .catch((err) => err);
        })
        .catch((err) => err);
    })
    .catch((err) => {
      log("ERR IN TICKET ", err);
      next(err);
    });
};
export const updateTicket = (req, res, next) => {};
export const deleteTicket = (req, res, next) => {};
