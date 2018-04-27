import express, { Router } from "express";
import Verify from "../../Authenticate/verify";
import { getAllCharges, createCharge, getChargeById } from "./Controller";
export const CoinbaseRouter = Router();
CoinbaseRouter.get("/charges", Verify.user, getAllCharges);
CoinbaseRouter.get("/charges/:cid", Verify.user, getChargeById);
CoinbaseRouter.post("/charges", Verify.user, createCharge);
