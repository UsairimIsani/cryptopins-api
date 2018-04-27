import Iron from "iron";
import tracer from "tracer";
import Config from "../Config";
import jwt from "jsonwebtoken";
import User from "../features/User/Model";
import { log } from "../util";
let Verify = {
  getToken(user, expiresIn) {
    return jwt.sign(user, Config.secretKey, {
      expiresIn: expiresIn || 3600
    });
  },
  user(req, res, next) {
    // check header or url parameters or post parameters for token
    let token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, Config.secretKey, (err, decoded) => {
        if (err) {
          let err = new Error("You are not authenticated!");
          err.status = 401;
          return next(err);
        } else {
          // if everything is good, save to request for use in other routes
          req._user = decoded;
          next();
        }
      });
    } else {
      // if there is no token
      // return an error
      let err = new Error("No token provided!");
      err.status = 403;
      return next(err);
    }
  },
  unseal(req, res, next) {
    Iron.unseal(
      req._user.data,
      Config.sealPass,
      Iron.defaults,
      (err, unsealed) => {
        if (err) {
          return res.status(500).json({
            message: "User verification error",
            success: false,
            data: null
          });
        } else {
          req._user = unsealed;
          next();
        }
      }
    );
  },

  nocache(req, res, next) {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    next();
  },

  admin(req, res, next) {
    // check header or url parameters or post parameters for token
    let token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, Config.secretKey, (err, decoded) => {
        if (err) {
          let err = new Error("You are not authenticated!");
          err.status = 401;
          return next(err);
        } else {
          // if everything is good, save to request for use in other routes
          req._user = decoded;
          // check if the user has admin flag true
          log(req._user.admin);
          if (req._user.admin) {
            next();
          } else {
            res.status(403).json({
              message: "You are not authorized to perform this operation!"
            });
          }
        }
      });
    } else {
      // if there is no token
      // return an error
      let err = new Error("No token provided!");
      err.status = 403;
      return next(err);
    }
  }
};
export default Verify;
