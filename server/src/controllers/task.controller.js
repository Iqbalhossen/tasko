const TaskModel = require("../models/task.model");
const { ObjectId } = require("mongodb");

const TaskView = async (req, res) => {
  try {
    const id = req.params.id;

    let { page, limit, name, status } = req.query;

    const filter = {};

    if (name && name !== "null" && name.trim() !== "") {
      const normalText = name.replace(/-/g, " ");
      filter.name = normalText;
    }

    if (status && status !== "null" && status.trim() !== "" && status !== "all") {
      filter.status = Number(status);
    }

    filter.user_id = id;

    const skip = (page - 1) * 10;
    if (!page) page = 1;
    if (!limit) limit = 10;

    const data = await TaskModel.find(filter)
      .sort("-createdAt")
      .skip(skip)
      .limit(limit)
      .populate("user_id");
    const dataLength = await TaskModel.find(filter);
    const pageCount = Math.ceil(
      parseFloat(dataLength.length) / parseFloat(limit)
    );
    res.status(201).json({
      success: true,
      data,
      length: dataLength.length,
      page,
      limit,
      pageCount,
    });
  } catch (error) {
    console.log(error);
  }
};

const TaskAdd = async (req, res) => {
  try {
    const data = req.body;
    const results = await TaskModel.create(data);
    res.status(201).json({
      success: true,
      message: "Task  add successfully",
      data: results,
    });
  } catch (error) {
    console.log(error);
  }
};

const SingleTaskView = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const data = await TaskModel.findOne(query);
    res.status(201).json({
      success: true,
      message: "Single Data",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const TaskUpdate = async (req, res) => {
  try {
    const { task_id, task_status } = req.body;
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const option = { upsert: true };
    const UpdateData = { task_status: task_status, status: task_id };
    const results = await TaskModel.findByIdAndUpdate(
      query,
      UpdateData,
      option
    );
    res.status(201).json({
      success: true,
      message: "Task Update successfully",
      data: results,
    });
  } catch (error) {
    console.log(error);
  }
};

const TaskDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const results = await TaskModel.findByIdAndDelete(query);
    res.status(201).json({
      success: true,
      message: "Task Delete successfully",
      data: results,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { TaskView, TaskAdd, SingleTaskView, TaskUpdate, TaskDelete };
