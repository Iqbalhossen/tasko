const mongoose = require("mongoose"); // Erase if already required
// Declare the Schema of the Mongo model
var TaskSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    task_status: {
      type: String,
      default:"Pending",
      trim: true,
    },
    dis: {
      type: String,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Task", TaskSchema);
