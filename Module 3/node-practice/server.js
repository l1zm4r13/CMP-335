const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("Welcome to my Node.js server!");
        res.end();
    }
    else if (req.url === "/api/courses") {
        res.setHeader("Content-Type", "application/json");

        res.write(JSON.stringify([
            { id: 1, name: "Web Development" },
            { id: 2, name: "Software Engineering" }
        ]));

        res.end();
    }
    else {
        res.statusCode = 404;
        res.end("Page not found");
    }
});

server.listen(3000);

console.log("Server running on port 3000...");