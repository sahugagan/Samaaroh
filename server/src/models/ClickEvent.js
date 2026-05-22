import mongoose from "mongoose";

const clickEventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    sessionId: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "",
    },
    eventName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    page: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },
    target: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },
    meta: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    ip: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "",
    },
    userAgent: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
  },
  { timestamps: true }
);

clickEventSchema.index({ createdAt: -1 });
clickEventSchema.index({ eventName: 1, createdAt: -1 });
clickEventSchema.index({ userId: 1, createdAt: -1 });

const ClickEvent = mongoose.model("ClickEvent", clickEventSchema);

export default ClickEvent;
