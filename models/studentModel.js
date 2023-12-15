import mongoose, { Schema } from "mongoose";

class StudentModel {
  initSchema() {
    const adminSchema = new Schema(
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        createdBy: String,
        registrationNumber: String,
        universityEntrance: Number,
        transcription: String,
        address: [
          {
            region: String,
            zone: String,
            wereda: String,
            schoolName: String,
          },
        ],
        disability: {
          enum: ["blind", "deaf"],
        },
      },
      { timestamps: true }
    );
    return adminSchema;
  }
  getStudentInstance() {
    return mongoose.model("Student", this.initSchema());
  }
}

export default new StudentModel();
