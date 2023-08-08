import { Schema, model } from "mongoose";

const schoolSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
});

export default model("schools", schoolSchema, "schools");
