import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    project: req.body.projectId
  });
  res.json(task);
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ project: req.params.projectId });
  res.json(tasks);
};

export const updateTaskStatus = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(task);
};