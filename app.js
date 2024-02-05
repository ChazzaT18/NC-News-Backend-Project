const express = require("express");
const cors = require('cors');
const app = express();
app.use(express.json());
const { getTopics } = require("./controllers/topics-controller");
const { getUsers } = require("./controllers/users-controller");
const {
  getArticleById,
  getArticles,
  getCommentsByArticleId,
  postCommentByArticleId,
  patchArticleVotesById,
} = require("./controllers/articles-controller");
const { getEndPoints } = require("./controllers/endpoints-controller");
const {
  deleteCommentByCommentId,
} = require("./controllers/comments-controller");



app.use(cors());

app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.delete("/api/comments/:comment_id", deleteCommentByCommentId);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.patch("/api/articles/:article_id", patchArticleVotesById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.get("/api", getEndPoints);

app.get("/api/articles", getArticles);

app.get("/api/users", getUsers);

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
