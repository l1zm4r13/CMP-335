const express = require("express");
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: "course1", description: "Introduction to course1", duration: "4 weeks", level: "Beginner" },
    { id: 2, name: "course2", description: "Introduction to course2", duration: "6 weeks", level: "Intermediate" },
    { id: 3, name: "course3", description: "Introduction to course3", duration: "8 weeks", level: "Advanced" },
    { id: 4, name: "Data Analytics", description: "Learn data analytics", duration: "5 weeks", level: "Intermediate" },
    { id: 5, name: "Artificial Intelligence", description: "Learn artificial intelligence", duration: "10 weeks", level: "Advanced" }
];

app.get("/", (req, res) => {
    res.send("Welcome to my Course Backend Service!");
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) {
        return res.status(404).send("Course not found");
    }

    res.send(course);
});

app.post("/api/courses", (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        return res.status(400).send("Course name must be at least 3 characters");
    }

    const course = {
    id: courses.length > 0
        ? Math.max(...courses.map(c => c.id)) + 1
        : 1,
    name: req.body.name,
    description: req.body.description,
    duration: req.body.duration,
    level: req.body.level
    };

    courses.push(course);
    res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) {
        return res.status(404).send("Course not found");
    }

    if (typeof req.body.name !== "string" || req.body.name.length < 3) {
        return res.status(400).send("Course name must be at least 3 characters");
    }

    course.name = req.body.name;
    course.description = req.body.description;
    course.duration = req.body.duration;
    course.level = req.body.level;
    res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) {
        return res.status(404).send("Course not found");
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

app.listen(3000, () => {
    console.log("Server running on port 3000...");
});