const db = require("../db/connection");

const fetchArticleById = (articleId) => {
  if (isNaN(articleId)) {
    return Promise.reject({
      statusCode: 400,
      msg: "article_id must be a number",
    });
  }
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [articleId])
    .then((data) => {
      const article = data.rows;
      if (article.length === 0) {
        return Promise.reject({ statusCode: 404, msg: "Not found" });
      }
      return { article: article[0] };
    });
};

const fetchArticles = () => {
  return db
    .query(
      `SELECT
  articles.author,
  articles.title,
  articles.article_id,
  articles.topic,
  articles.created_at,
  articles.votes,
  articles.article_img_url,
  CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count
FROM
  articles
LEFT JOIN
  comments ON articles.article_id = comments.article_id
GROUP BY
  articles.author,
  articles.title,
  articles.article_id,
  articles.topic,
  articles.created_at,
  articles.votes,
  articles.article_img_url
ORDER BY
  articles.created_at DESC`
    )
    .then((articles) => {
      // articles.rows.forEach((article) => {
      //   article.comment_count = Number(article.comment_count);
      // });
      console.log(articles.rows);
      return articles.rows;
    });
};

const fetchCommentsByArticleId = (articleId) => {
  return db
    .query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC",
      [articleId]
    )
    .then((comments) => {
      return comments.rows;
    });
};

module.exports = { fetchArticleById, fetchArticles, fetchCommentsByArticleId };
