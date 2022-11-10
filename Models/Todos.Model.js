const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    tag: { type: String, default: "Pending" },
    task: { type: String, required: true },
    userId: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const todoModel = mongoose.model("todo", todoSchema);

module.exports = { todoModel };
