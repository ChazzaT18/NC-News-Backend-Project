const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics-controller");
const {
  getArticleById,
  getArticles,
  getCommentsByArticleId
} = require("./controllers/articles-controller");
const { getEndPoints } = require("./controllers/endpoints-controller");

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
