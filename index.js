const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "sri_12",
  password: "sri_12345",
  database: "phone_login.db",
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  console.log("Connected to the database");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add a new customer
app.post("/api/customers", (req, res) => {
  const { name, phoneNumber, email } = req.body;

  if (!name || !phoneNumber || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  connection.query(
    "SELECT * FROM customers WHERE phone_number = ?",
    [phoneNumber],
    (err, results) => {
      if (err) {
        console.error("Error querying the database: ", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length > 0) {
        return res.status(409).json({ error: "Phone number already exists" });
      }

      // Insert the customer into the database
      connection.query(
        "INSERT INTO customers (name, phone_number, email) VALUES (?, ?, ?)",
        [name, phoneNumber, email],
        (err, results) => {
          if (err) {
            console.error("Error inserting customer: ", err);
            return res.status(500).json({ error: "Internal server error" });
          }

          return res
            .status(201)
            .json({ message: "Customer added successfully" });
        }
      );
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
