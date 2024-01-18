const db = require("../db/connection");

const fetchArticleById = (articleId) => {
  if (isNaN(articleId)) {
    return Promise.reject({
      statusCode: 400,
      msg: "article_id must be a number",
    });
  }

  return db
    .query(
      `SELECT
        articles.author,
        articles.body,
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
      WHERE articles.article_id = $1
      GROUP BY
        articles.author,
        articles.title,
        articles.body,
        articles.article_id,
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.article_img_url
      ORDER BY
        articles.created_at DESC`,
      [articleId]
    )
    .then((data) => {
      const article = data.rows;
      if (article.length === 0) {
        return Promise.reject({ statusCode: 404, msg: "Article not found" });
      }
      return article[0];
    });
};

const fetchArticles = (topic) => {
  if (topic !== undefined && typeof topic !== "string") {
    return Promise.reject({ statusCode: 400, msg: "Bad request" });
  }

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
      if (topic) {
        const articlesByTopic = articles.rows.filter((article) => {
          return article.topic === topic;
        });
        if (articlesByTopic.length === 0) {
          return Promise.reject({
            statusCode: 404,
            msg: "No articles with given topic",
          });
        }
        return articlesByTopic;
      }
      return articles.rows;
    });
};

const fetchCommentsByArticleId = (articleId) => {
  if (isNaN(articleId)) {
    return Promise.reject({
      statusCode: 400,
      msg: "article_id must be a number",
    });
  }

  return fetchArticleById(articleId).then((article) => {
    if (article.length === 0) {
      return Promise.reject({ statusCode: 404, msg: "Article not found" });
    }

    return db
      .query(
        "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC",
        [articleId]
      )
      .then((comments) => {
        return comments.rows;
      });
  });
};

const postComment = (articleId, username, body) => {
  if (isNaN(articleId)) {
    return Promise.reject({
      statusCode: 400,
      msg: "article_id must be a number",
    });
  } else if (!username) {
    return Promise.reject({
      statusCode: 400,
      msg: "must have a username",
    });
  } else if (!body) {
    return Promise.reject({
      statusCode: 400,
      msg: "must have a body",
    });
  }

  return fetchArticleById(articleId).then((article) => {
    if (article.length === 0) {
      return Promise.reject({ statusCode: 404, msg: "Not found" });
    }

    return db
      .query(
        "INSERT INTO comments (article_id, author, body, votes, created_at) VALUES ($1, $2, $3, 0, $4) RETURNING *;",
        [articleId, username, body, new Date().toUTCString()]
      )
      .then((data) => {
        const comment = data.rows[0];
        return comment;
      });
  });
};

const patchVotesInArticle = (articleId, votes) => {
  if (isNaN(articleId)) {
    return Promise.reject({
      statusCode: 400,
      msg: "article_id must be a number",
    });
  } else if (typeof votes !== "number") {
    return Promise.reject({
      statusCode: 400,
      msg: "inc_votes must be a number",
    });
  }

  return fetchArticleById(articleId).then((article) => {
    if (!article) {
      return Promise.reject({ statusCode: 404, msg: "Article not found" });
    }
    console.log(article);
    const updatedVotes = article.votes + votes;

    return db
      .query(
        "UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *;",
        [updatedVotes, articleId]
      )
      .then((data) => {
        const article = data.rows[0];
        return article;
      });
  });
};

module.exports = {
  fetchArticleById,
  fetchArticles,
  fetchCommentsByArticleId,
  postComment,
  patchVotesInArticle,
};
