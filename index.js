const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// ✅ Get all todos
app.get('/get', async (req, res) => {
    try {
        const todos = await TodoModel.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Update task status (Toggle `done`)
app.put('/update/:id', async (req, res) => {
    try {
        const todo = await TodoModel.findById(req.params.id);
        if (!todo) return res.status(404).json({ error: "Task not found" });

        todo.done = !todo.done;  // ✅ Toggle `done` status
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Delete a task
app.delete('/delete/:id', async (req, res) => {
    try {
        const deletedTodo = await TodoModel.findByIdAndDelete(req.params.id);
        if (!deletedTodo) return res.status(404).json({ error: "Task not found" });

        res.json({ message: "Task deleted successfully", deletedTodo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Add a new task
app.post('/add', async (req, res) => {
    try {
        const { task } = req.body;
        if (!task) return res.status(400).json({ error: "Task is required" });

        const newTask = await TodoModel.create({ task, done: false });
        res.json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Start the server
const PORT = 4007;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
