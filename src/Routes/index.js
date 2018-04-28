import express from "express";
import { log } from "../util";
import UserRouter from "../features/User/Router";
import { TicketRouter } from "../features/Tickets/Router";
import { CoinbaseRouter } from "../features/Coinbase/Router";
//----API---import

export default function(app, config, models) {
  var router = express.Router();
  //----API----Routes
  app.use("/api", router);
  router.use("/user", UserRouter);
  router.use("/tickets", TicketRouter);
  router.use("/coinbase", CoinbaseRouter);
  // app.use(`/user`, UserRouter);
}
