import mongoose from "mongoose";
let Schema = mongoose.Schema;
import passportLocalMongoose from "passport-local-mongoose";
let UserSchema = new Schema({
  username: String,
  password: String,
  OauthId: String,
  OauthToken: String,
  firstname: {
    type: String,
    default: ""
  },
  lastname: {
    type: String,
    default: ""
  },
  admin: {
    type: Boolean,
    default: false
  },
  resetToken: {
    type: String,
    default: ""
  }
});
UserSchema.plugin(passportLocalMongoose);
let User = mongoose.model("user", UserSchema);
export default User;
