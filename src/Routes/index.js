import express from "express";
import UserRouter from "../features/User/Router";
import { log } from "../util";
//----API---import

export default function(app, config, models) {
  var router = express.Router();
  //----API----Routes
  router.use("/user", UserRouter);
  app.use("/api", router);

  // app.use(`/user`, UserRouter);
}
