const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const { pool } = require("./config");

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
// maybe use these unclear
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Put all API endpoints under '/api'
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

app.get("/api/articles/:id", (req, res) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM articles WHERE id = $1", [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
});

// better syntax better late than never
const updateArticle = (request, response) => {
  const id = parseInt(request.params.id);
  const { title, body } = request.body;
  pool.query(
    "UPDATE articles SET title = $1, body = $2 WHERE id = $3",
    [title, body, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json({
        status: "success",
        message: `Article with ID ${id} successfully updated.`
      });
    }
  );
};

app.put("/api/articles/:id", updateArticle);

const deleteArticle = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM articles WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json({
      status: "success",
      message: `Article with ID ${id} successfully deleted.`
    });
  });
};

app.delete("/api/articles/:id", deleteArticle);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`API server listening on ${port}`);
