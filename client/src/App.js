import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // ADD TASK
  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  // DELETE TASK
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // TOGGLE COMPLETE
  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // EDIT TASK
  const editTask = (id) => {
    const newText = prompt("Edit task:");
    if (!newText) return;

    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, text: newText } : t
      )
    );
  };

  // FILTER TASKS
  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  // PROGRESS
  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  return (
    <div className="container">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>🚀 Task Manager</h2>
        <p>Organize your day</p>

        <button onClick={() => setFilter("all")}>🏠 All</button>
        <button onClick={() => setFilter("pending")}>⏳ Pending</button>
        <button onClick={() => setFilter("completed")}>✅ Completed</button>
      </div>

      {/* MAIN */}
      <div className="main">
        <h1>Welcome back 👋</h1>
        <p>Stay productive and get things done</p>

        {/* INPUT */}
        <div className="input-box">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What do you need to do?"
          />
          <button onClick={addTask}>+ Add</button>
        </div>

        {/* PROGRESS */}
        <div className="progress-section">
          <h3>Progress</h3>
          <p>
            {completedCount} / {tasks.length} tasks completed ({progress}%)
          </p>

          <div className="progress-bar">
            <div style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* TASK LIST */}
        <div className="task-list">
          {filteredTasks.map((t) => (
            <div className="task" key={t.id}>
              <div className="left">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleTask(t.id)}
                />

                <span className={t.completed ? "done" : ""}>
                  {t.text}
                </span>

                <span className="status">
                  {t.completed ? "Completed" : "Pending"}
                </span>
              </div>

              <div className="right">
                <button onClick={() => editTask(t.id)}>✏️</button>
                <button onClick={() => deleteTask(t.id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}