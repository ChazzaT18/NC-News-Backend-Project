const db = require("../db/connection");
const endPointData = require("../endpoints.json");

const fetchTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((data) => {
    return data.rows;
  });
};

const fetchArticleById = (articleId) => {
  if (isNaN(articleId)) {
    return Promise.reject({ msg: "Bad request" });
  }
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [articleId])
    .then((data) => {
      const articles = data.rows;
      if (articles.length === 0) {
        return Promise.reject({ msg: "Not found" });
      }
      return articles;
    });
};

const fetchEndPoints = () => {
  return endPointData;
};

module.exports = { fetchTopics, fetchEndPoints, fetchArticleById };
