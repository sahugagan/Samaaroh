import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 120,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 20,
      default: "",
    },
    companyName: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "",
    },
    service: {
      type: String,
      required: true,
      enum: ["Android Development", "Software Development", "Web Development", "Other"],
    },
    budget: {
      type: String,
      trim: true,
      maxlength: 50,
      default: "",
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ["new", "in_progress", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
