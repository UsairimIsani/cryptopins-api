import { TicketModel } from "./Model";

export const getAllTickets = (req, res, next) => {};
export const getTicketsByIndex = (req, res, next) => {};
export const getTicket = (req, res, next) => {};
export const createTicket = (req, res, next) => {
  TicketModel.create({ ...req.body })
    .then(Ticket => {
      res.json(Ticket);
    })
    .catch(err => {
      next(err);
    });
};
export const updateTicket = (req, res, next) => {};
export const deleteTicket = (req, res, next) => {};
