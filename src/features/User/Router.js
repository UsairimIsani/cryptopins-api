import express from "express";
let router = express.Router();
import { Verify } from "../../Authenticate";
import { listAll, login, logout, register, verifyUser } from "./Controller";
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
