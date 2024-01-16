const express = require("express");
const app = express();
app.use(express.json());
const { getTopics } = require("./controllers/topics-controller");
const {
  getArticleById,
  getArticles,
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("./controllers/articles-controller");
const { getEndPoints } = require("./controllers/endpoints-controller");

app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.get("/api", getEndPoints);

app.get("/api/articles", getArticles);

app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({ msg: err.msg });
});
module.exports = app;
