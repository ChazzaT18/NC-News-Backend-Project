const db = require("../db/connection");

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

module.exports = { fetchArticleById };