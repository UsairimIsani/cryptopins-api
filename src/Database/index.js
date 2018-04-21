import mongoose from "mongoose";
import Config from "../Config";
import { log } from "../util";
export default {
  connect() {
    mongoose
      .connect(Config.mongoUrl, {
        useMongoClient: true
        /* other options */
      })
      .then(db => {
        //   // we're connected!
        log(`MongoDB Open at ${Config.mongoUrl}`);
        log(`*****_____*****_____*****`);
        // db.connection.addListener("open", db => {
        // });
      })
      .catch(err => {
        log(`MongoDb Connection Error : `, err);
      });
  }
};
