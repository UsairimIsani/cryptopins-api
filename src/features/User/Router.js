import express, { Router } from "express";
import Verify from "../../Authenticate/verify";
import { listAll, login, logout, register, verifyUser } from "./Controller";
let router = Router();
//GET users
router.get("/", Verify.user, listAll);
//Add user
router.post("/register", register);
//Login
router.post("/login", login);
//Logout
router.get("/logout", logout);
//Verify me
router.get("/me", Verify.nocache, Verify.user, Verify.unseal, verifyUser);
export default router;
