const express = require("express");
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
    { id: 4, name: "Data Analytics" },
    { id: 5, name: "Artificial Intelligence" }
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
    name: req.body.name
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