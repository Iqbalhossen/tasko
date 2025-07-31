const express = require("express");
const route = express.Router();

const {
  TaskAdd,
  TaskView,
  SingleTaskView,
  TaskUpdate,
  TaskDelete,
} = require("../controllers/task.controller");

const {
  TaskStoreValidationRules,
} = require("./../middlewares/Validation/TaskValidationRules/TaskValidationRules");

const {
  ValidateResults,
} = require("./../middlewares/Validation/ValidateResults/ValidateResults");

const { protect } = require("./../middlewares/auth.middleware");

route.get("/view/:id", protect, TaskView);

route.post(
  "/store",
  protect,
  TaskStoreValidationRules(),
  ValidateResults,
  TaskAdd
);

route.get("/single/view/:id", protect, SingleTaskView);
route.put("/update/:id", protect, TaskUpdate);
route.delete("/delete/:id", protect, TaskDelete);

module.exports = route;
