import passport from "passport";
import { Verify, Authenticate } from "../../Authenticate";
import User from "./Model";
import { log } from "../../util";

export function listAll(req, res, next) {
  User.find({}, (err, users) => {
    if (err) throw err;
    res.json(users);
  });
}

export function register(req, res) {
  User.register(
    new User({
      username: req.body.username
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        return res.status(500).json({
          err: err
        });
      }
      if (req.body.firstname) {
        user.firstname = req.body.firstname;
      }
      if (req.body.lastname) {
        user.lastname = req.body.lastname;
      }
      user.save((err, user) => {
        passport.authenticate("local")(req, res, () => {
          return res.status(200).json({
            message: "User registered",
            success: true,
            data: null
          });
        });
      });
    }
  );
}

export function login(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, err => {
      log(err);
      if (err) {
        return res.status(500).json({
          message: "Could not log in user",
          success: false,
          data: err
        });
      }
      auth.getLoginData(user).then(
        data => {
          console.log(data);
          return res.status(200).json({
            message: "Login successful!",
            success: true,
            data: data
          });
        },
        err => {
          console.log(err);
          return res.status(400).json({
            message: "Something went wrong while login.",
            success: false,
            data: null
          });
        }
      );
    });
  })(req, res, next);
}

export function verifyUser(req, res) {
  log(req._user);
  User.findById(req._user._id, (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong while finding user",
        success: false,
        data: null
      });
    }
    auth.getLoginData(user).then(
      data => {
        log(data);
        return res.status(200).json({
          message: "User Data",
          success: true,
          data: data
        });
      },
      err => {
        console.log(err);
        return res.status(500).json({
          message: "Something went wrong while getting data ",
          success: false,
          data: null
        });
      }
    );
  });
}

export function logout(req, res) {
  req.logout();
  res.status(200).json({
    message: "logout",
    success: true,
    data: null
  });
}
