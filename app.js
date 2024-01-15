const express = require("express");
const app = express()
const { getTopics, getEndPoints, getArticleById } = require('./controllers/topics-controller')

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api", getEndPoints);

app.use((err, req, res, next) => {
    if (err.msg === 'Not found'){
      res.status(404).send({msg: err.msg})
    }
    else next(err)
  })

  app.use((err, req, res, next) => {
    if (err.msg === 'Bad request'){
      res.status(400).send({msg: err.msg})
    }
  })

module.exports = app