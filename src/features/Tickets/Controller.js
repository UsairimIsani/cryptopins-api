import { TicketModel } from "./Model";
import { log } from "../../util";
export const getAllTickets = (req, res, next) => {
  TicketModel.find({}).then(tickets => {
    res
      .json({
        data: tickets,
        success: true,
        message: "Successfully Fetched All Tickets!"
      })
      .catch(err => {
        res.json({
          success: false,
          message: "Couldn't Find any Tickets",
          data: null
        });
      });
  });
};
export const getTicketsByIndex = (req, res, next) => {};
export const getTicket = (req, res, next) => {};
export const createTicket = (req, res, next) => {
  log(req.body);
  TicketModel.create({ ...req.body })
    .then(Ticket => {
      res.json({
        success: true,
        message: "New Ticket created Successfully",
        data: Ticket
      });
    })
    .catch(err => {
      next(err);
    });
};
export const updateTicket = (req, res, next) => {};
export const deleteTicket = (req, res, next) => {};
