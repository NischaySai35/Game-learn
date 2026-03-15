const Project = require("../models/Project");

exports.submitProject = async (req, res) => {
  const project = await Project.create(req.body);
  res.json(project);
};

exports.getUserProjects = async (req, res) => {
  const projects = await Project.find({ userId: req.params.userId });
  res.json(projects);
};