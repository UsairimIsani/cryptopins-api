import express from "express";
import path from "path";
import favicon from "serve-favicon";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import database from "./Database";
import passport from "passport";
import cors from "cors";
import tracer from "tracer";
import debug from "debug";
import http from "http";
import art from "ascii-art";
import router from "./Routes/";
import "./Authenticate/auth";

debug("api:server");
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}
function onListening() {
  let addr = server.address();
  let bind = typeof addr === "string" ? `pipe  ${addr}` : `port  ${addr.port}`;
  debug(`Listening on ${bind}`);

  art.font("Cryptopins", "Doom", rendered => {
    console.log(rendered);
  });

  log(`Server Running on port ${app.get("port")}`);
  log(
    "###########################################################################"
  );
}

let log = tracer.console({
  format: "{{message}}  - {{file}}:{{line}}"
}).log;

let app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
router(app);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//============ error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
      data: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    success: false,
    message: err.message,
    data: null
  });
});

let port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
database.connect();
var server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
