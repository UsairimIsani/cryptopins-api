import express, { Router } from "express";
import Verify from "../../Authenticate/verify";
import {
  getAllTickets,
  createTicket,
  updateTicket,
  deleteTicket
} from "./Controller";
export let TicketRouter = Router();
TicketRouter.get("/", Verify.user, getAllTickets);
// TicketRouter.get("/:tid", Verify.user, getTicket);
TicketRouter.post("/", Verify.user, createTicket);
TicketRouter.put("/:tid", Verify.user, updateTicket);
TicketRouter.delete("/:tid", Verify.user, deleteTicket);
