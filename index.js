const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const generatePassword = require("password-generator");
const cors = require("cors");
const { pool } = require("./config");

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/public")));
// maybe use these unclear
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// Put all API endpoints under '/api'
app.get("/api/passwords", (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  );

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

app.get("/api/articles", (req, res) => {
  pool.query("SELECT * FROM articles", (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results.rows);
    res.status(200).json(results.rows);
  });
});

app.post("/api/articles", (req, res) => {
  const { title, body } = req.body;
  console.log(req.body);
  pool.query(
    "INSERT INTO articles (title, body) VALUES ($1, $2)",
    [title, body],
    err => {
      if (err) {
        throw err;
      }
      res.status(201).json({ status: "success", message: "Article added." });
    }
  );
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/public/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
