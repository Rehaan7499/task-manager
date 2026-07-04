const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// 🔥 MongoDB Connection (ENV se)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));
// 🔥 Schema & Model
const taskSchema = new mongoose.Schema(
  {
    title: String,
    completed: Boolean,
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

// ================= ROUTES =================

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});

// ✅ CREATE (POST)
app.post("/tasks", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ READ (GET)
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE (PUT)
app.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE
app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task Deleted ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});