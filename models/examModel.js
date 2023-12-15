import { Schema } from "mongoose";

class ExamModel {
  initSchema() {
    const examSchema = new Schema(
      {
        studentId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        subjectId: {
          type: Schema.Types.ObjectId,
          ref: "Course",
        },
        answer: [],

        score: Number,
      },

      {
        timestamps: {
          createdAt: "submitted_at",
          updatedAt: "updated_at",
        },
      }
    );
    return examSchema;
  }
  getCourseInstance() {
    return mongoose.model("Course", this.initSchema());
  }
}
export default new ExamModel();
