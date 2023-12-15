import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";
class UserModel {
  init() {
    const userSchema = new Schema(
      {
        username: {
          type: String,
        },
        email: {
          unique: true,
          type: String,
        },
        password: {
          type: String,
        },
        role: {
          type: String,
          // enum: ["admin", "staff", "user"],
        },
        name: {
          type: String,
          //  required: [true, "please tell us your name"],
        },
        phoneNumber: {
          type: String,
        },
        photo: {
          type: String,
        },
        gender: {
          type: String,
          //    required: [true, "Gender is required."],
        },
        age: {
          type: Number,
        },
      },
      { timestamps: true }
    );
    userSchema.pre("save", async function (next) {
      //Only run the function when the password is modified
      if (!this.isModified("password")) {
        return next();
      } else {
        this.password = await bcrypt.hash(this.password, 12);
        next();
      }
    });
    userSchema.methods.matchPassword = async function (
      loginPassword,
      fromDBPassword
    ) {
      console.log(loginPassword + "  " + fromDBPassword);
      return await bcrypt.compare(loginPassword, fromDBPassword);
    };
    return userSchema;
  }
  getUserInstance() {
    return mongoose.models["User"] || mongoose.model("User", this.init());
  }
}

export default new UserModel();
