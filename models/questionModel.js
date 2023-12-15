import mongoose, { Schema } from "mongoose";

class QuestionModel {
  initSchema() {
    const questionSchema = new Schema(
      { 
          subject: {
          type: Schema.Types.ObjectId,
          ref: "Course",
        },
        question:
        {
          title: String,
          options: [],
          correctAnswer: String,
          photo: String,
        },

      },

      { timestamps: true }
    );

    return questionSchema;
  }

  getQuestionInstance() {
    return mongoose.model("Question", this.initSchema());
  }
}
export default new QuestionModel();
