const express = require("express");
const app = express();

app.use(express.json());

const todos = [
    { id: 1, description: "Complete Javascript homework", dueDate: "2026-10-20", completed: false },
    { id: 2, description: "Study for Statistics exam", dueDate: "2026-10-22", completed: false },
    { id: 3, description: "Submit Web Development project", dueDate: "2026-10-25", completed: true },
    { id: 4, description: "Write First Draft of Research Paper", dueDate: "2026-10-27", completed: false },
    { id: 5, description: "Summarize Research Findings", dueDate: "2026-10-21", completed: true }
];

app.get("/", (req, res) => {
    res.send("Welcome to my To-Do Backend Service!");
});

app.get("/api/todos", (req, res) => {
    res.send(todos);
});

app.get("/api/todos/:id", (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));

    if (!todo) {
        return res.status(404).send("To-do item not found");
    }

    res.send(todo);
});

app.post("/api/todos", (req, res) => {
    const { description, dueDate, completed } = req.body || {};

    if (typeof description !== "string" || description.trim().length < 3) {
        return res.status(400).send("Description must be at least 3 characters");
    }

    if (typeof dueDate !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(dueDate) ||
        !Number.isFinite(Date.parse(dueDate)) ||
        new Date(dueDate).toISOString().slice(0, 10) !== dueDate) {
        return res.status(400).send("Due date must be a valid YYYY-MM-DD date");
    }

    if (typeof completed !== "boolean") {
        return res.status(400).send("Completed must be true or false");
    }

    const todo = {
    id: todos.length > 0
        ? Math.max(...todos.map(t => t.id)) + 1
        : 1,
        description: req.body.description,
        dueDate: req.body.dueDate,
        completed: req.body.completed
    };

    todos.push(todo);
    res.send(todo);
});

app.put("/api/todos/:id", (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));

    if (!todo) {
        return res.status(404).send("To-do item not found");
    }

    const { description, dueDate, completed } = req.body || {};

    if (typeof description !== "string" || description.trim().length < 3) {
        return res.status(400).send("Description must be at least 3 characters");
    }

    if (typeof dueDate !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(dueDate) ||
        !Number.isFinite(Date.parse(dueDate)) ||
        new Date(dueDate).toISOString().slice(0, 10) !== dueDate) {
        return res.status(400).send("Due date must be a valid YYYY-MM-DD date");
    }

    if (typeof completed !== "boolean") {
        return res.status(400).send("Completed must be true or false");
    }

    todo.description = req.body.description;
    todo.dueDate = req.body.dueDate;
    todo.completed = req.body.completed;
    res.send(todo);
});

app.delete("/api/todos/:id", (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));

    if (!todo) {
        return res.status(404).send("To-do item not found");
    }

    const index = todos.indexOf(todo);
    todos.splice(index, 1);

    res.send(todo);
});

app.listen(3000, () => {
    console.log("Server running on port 3000...");
});