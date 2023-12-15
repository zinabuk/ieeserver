import { Schema } from "mongoose";
const { ObjectId } = Schema.Types;
class CourseModel {
  initSchema() {
    const courseSchema = new Schema(
      {
        instructorId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        title: String,
        description: String,
        value: Number,
        duration: String,
        questions: [
          {
            type: ObjectId,
            ref: "Question",
          },
        ],
      },
      {
        timestamps: true,
      }
    );
    return courseSchema;
  }
  getCourseInstance() {
    return mongoose.model("Course", this.initSchema());
  }
}
export default new CourseModel();
