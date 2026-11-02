const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(express.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'LizMarie~1903',
    database: 'node_demo'
});

con.connect(function(err) {
    if (err) {
        console.log('Database connection failed:', err.message);
        return;
    }

    console.log('Connected to MySQL!');

// Create the customers table (already completed)
    /*
    let sql = `CREATE TABLE IF NOT EXISTS customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        city VARCHAR(255)
    )`;

    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log('Customers table created!');
    });
    */

    // Run this only once to insert our initial customers
    // insertMockCustomers();
});

// Function to insert our initial mock customers
function insertMockCustomers() {

    const customers = [
        ['Emma Johnson', 'emma.johnson@example.com', 'New York'],
        ['Liam Smith', 'liam.smith@example.com', 'Chicago'],
        ['Olivia Brown', 'olivia.brown@example.com', 'Los Angeles'],
        ['Noah Davis', 'noah.davis@example.com', 'Miami'],
        ['Sophia Wilson', 'sophia.wilson@example.com', 'Seattle']
    ];

    let sql = 'INSERT INTO customers (name, email, city) VALUES ?';

    con.query(sql, [customers], function(err, result) {
        if (err) {
            console.log('Error inserting customers:', err.message);
            return;
        }

        console.log('Number of records inserted: ' + result.affectedRows);
    });
}

// GET - Select all customers from MySQL
app.get('/api/customers', (req, res) => {

    let sql = "SELECT * FROM customers";

    con.query(sql, function(err, result, fields) {
        if (err) {
            console.log("Error selecting customers:", err.message);
            return res.status(500).send("Database error");
        }

        res.send(result);
    });
});

// GET - Select a single customer by ID
app.get('/api/customers/:id', (req, res) => {

    let sql = "SELECT * FROM customers WHERE id = ?";

    con.query(sql, [req.params.id], function(err, result, fields) {
        if (err) {
            console.log("Error selecting customer:", err.message);
            return res.status(500).send("Database error");
        }

        if (result.length === 0) {
            return res.status(404).send("Customer not found");
        }

        res.send(result[0]);
    });
});

// POST - Insert a new customer into MySQL
app.post('/api/customers', (req, res) => {

    if (!req.body || !req.body.name || !req.body.email || !req.body.city) {
        return res.status(400).send("Name, email, and city are required");
    }

    let sql = "INSERT INTO customers (name, email, city) VALUES (?, ?, ?)";

    let values = [
        req.body.name,
        req.body.email,
        req.body.city
    ];

    con.query(sql, values, function(err, result) {
        if (err) {
            console.log("Error inserting customer:", err.message);
            return res.status(500).send("Database error");
        }

        res.status(201).send({
            id: result.insertId,
            name: req.body.name,
            email: req.body.email,
            city: req.body.city
        });
    });
});

// PUT - Update a customer by ID
app.put('/api/customers/:id', (req, res) => {

    if (!req.body || !req.body.name || !req.body.email || !req.body.city) {
        return res.status(400).send("Name, email, and city are required");
    }

    let sql = "UPDATE customers SET name = ?, email = ?, city = ? WHERE id = ?";

    let values = [
        req.body.name,
        req.body.email,
        req.body.city,
        req.params.id
    ];

    con.query(sql, values, function(err, result) {
        if (err) {
            console.log("Error updating customer:", err.message);
            return res.status(500).send("Database error");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Customer not found");
        }

        res.send("Customer updated successfully!");
    });
});

// DELETE - Delete a customer by ID
app.delete('/api/customers/:id', (req, res) => {

    let sql = "DELETE FROM customers WHERE id = ?";

    con.query(sql, [req.params.id], function(err, result) {
        if (err) {
            console.log("Error deleting customer:", err.message);
            return res.status(500).send("Database error");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Customer not found");
        }

        res.send("Customer deleted successfully!");
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`Listening on port ${port}...`);});