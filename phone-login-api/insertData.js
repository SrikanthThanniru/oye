const mysql = require("mysql");

const customers = [
  { email: "anurag11@yopmail.com", name: "anurag" },
  { email: "sameer11@yopmail.com", name: "sameer" },
  { email: "ravi11@yopmail.com", name: "ravi" },
  { email: "akash11@yopmail.com", name: "akash" },
  { email: "anjali11@yopmail.com", name: "anjai" },
  { email: "santosh11@yopmail.com", name: "santosh" },
];

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "sri_12",
  password: "sri_12345",
  database: "insert.db",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");

  customers.forEach((customer) => {
    const { email, name } = customer;

    // Check if the email already exists
    connection.query(
      "SELECT * FROM customers WHERE email = ?",
      [email],
      (err, results) => {
        if (err) {
          console.error("Error querying the database:", err);
          return;
        }

        if (results.length > 0) {
          // If email exists, update the name
          connection.query(
            "UPDATE customers SET name = ? WHERE email = ?",
            [name, email],
            (err, results) => {
              if (err) {
                console.error("Error updating customer:", err);
              } else {
                console.log(`Customer ${name} updated successfully`);
              }
            }
          );
        } else {
          // If email does not exist, insert a new customer
          connection.query(
            "INSERT INTO customers (name, email) VALUES (?, ?)",
            [name, email],
            (err, results) => {
              if (err) {
                console.error("Error inserting customer:", err);
              } else {
                console.log(`Customer ${name} inserted successfully`);
              }
            }
          );
        }
      }
    );
  });
});
