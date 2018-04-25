import passport from "passport";
import LocalStrategy from "passport-local";
import Iron from "iron";
import tracer from "tracer";
import Config from "../Config";
import User from "../features/User/Model";
import Verify from "./verify";
import { log } from "../util";
//Setup Local Login Strategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export function getLoginData(user, expiry) {
  let userData = user._doc;
  delete userData.hash;
  delete userData.salt;
  delete userData.resetToken;
  // delete userData.admin;
  return new Promise((resolve, reject) => {
    Iron.seal(userData, Config.sealPass, Iron.defaults, (err, sealed) => {
      if (err) {
        reject(err);
      }
      let token = Verify.getToken({ data: sealed }, expiry || `30 days`);
      let data = {
        token: token,
        user: userData
      };
      resolve(data);
    });
  });
}
