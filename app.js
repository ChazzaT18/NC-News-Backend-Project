const express = require("express");
const app = express()
const { getTopics, getEndPoints } = require('./controllers/topics-controller')

app.get("/api/topics", getTopics);
console.log(getEndPoints)
app.get("/api", getEndPoints);

module.exports = app