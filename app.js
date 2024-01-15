const express = require("express");
const app = express()
const { getTopics } = require('./controllers/topics-controller')
const { getArticleById } = require('./controllers/articles-controller')
const { getEndPoints } = require('./controllers/endpoints-controller')

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
    if (err.msg === 'Bad request' || err.msg === 'article_id must be a number'){
      res.status(400).send({msg: err.msg})
    }
  })

module.exports = app