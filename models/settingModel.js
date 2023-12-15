import { Schema } from "mongoose";
class settingSchema {
  init() {
    const setSchema = new Schema({
      adminId: {
        type: ObjectId,
        ref: "User",
      },
      examStratDate: {
        type: Date,
      },
      resultReleaseDate: {
        type: String,
      },
    });
  }
}
