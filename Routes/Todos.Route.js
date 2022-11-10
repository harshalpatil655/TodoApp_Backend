const { Router } = require("express");
const { todoModel } = require("../Models/Todos.Model");

const todoController = Router();

todoController.get("/", async (req, res) => {
  const { userId } = req.body;
  const allData = await todoModel.find({ userId });
  res.send(allData);
});

todoController.post("/create", async (req, res) => {
  const { heading, tag, task, userId } = req.body;

  if (heading && task) {
    const newData = new todoModel({
      heading,
      tag,
      task,
      userId,
    });
    await newData.save();
    res.send(newData);
  } else {
    res.send("Invalid Inputs");
  }
});

todoController.delete("/delete/:todoId", async (req, res) => {
  const { todoId } = req.params;

  const deletetodo = await todoModel.findByIdAndDelete({
    _id: todoId,
    userId: req.body.userId,
  });

  if (deletetodo) {
    res.send("Successfully Deleted");
  } else {
    res.send("Deletion Unsuccessfull");
  }
});

todoController.patch("/edit/:todoId", async (req, res) => {
  const { todoId } = req.params;

  const updatetodo = await todoModel.findOneAndUpdate(
    { _id: todoId, userId: req.body.userId },
    { ...req.body }
  );

  if (updatetodo) {
    res.send({ message: "successfully updated", updatetodo });
  } else {
    res.send({ message: "Error in Updation" });
  }
});

module.exports = { todoController };
