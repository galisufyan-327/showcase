import { Schema, model } from "mongoose";

const educationSchema = new Schema({
  school: {
    type: Schema.Types.ObjectId,
    ref: "schools",
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  degree: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  start_year: {
    type: String,
    required: true,
  },
  end_year: {
    type: String,
    required: false,
  },
  is_end_year_expected: {
    type: Boolean,
    required: false,
  },
  grade: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
});

export default model("educations", educationSchema, "educations");
