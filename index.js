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

const getAllArticles = (request, response) => {
  pool.query("SELECT * FROM articles", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const postArticle = (request, response) => {
  const { title, body } = request.body;
  // RETURNING * is how you get results returned fuck yeah
  pool.query(
    "INSERT INTO articles (title, body) VALUES ($1, $2) RETURNING *",
    [title, body],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json(results.rows);
    }
  );
};

const getArticle = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM articles WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

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

// Put all API endpoints under '/api'
app.get("/api/articles", getAllArticles);
app.post("/api/articles", postArticle);
app.get("/api/articles/:id", getArticle);
app.put("/api/articles/:id", updateArticle);
app.delete("/api/articles/:id", deleteArticle);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`API server listening on ${port}`);
