const {
  fetchArticleById,
  fetchArticles,
  fetchCommentsByArticleId,
  postComment,
  patchVotesInArticle,
} = require("../models/articles-model");

const getArticleById = (request, response, next) => {
  const articleId = Number(request.params.article_id);
  fetchArticleById(articleId)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

const getArticles = (request, response, next) => {
  const { topic } = request.query;
  fetchArticles(topic)
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

const getCommentsByArticleId = (request, response, next) => {
  const articleId = Number(request.params.article_id);
  fetchCommentsByArticleId(articleId)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

const postCommentByArticleId = (request, response, next) => {
  const articleId = Number(request.params.article_id);
  const { username, body } = request.body;
  postComment(articleId, username, body)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

const patchArticleVotesById = (request, response, next) => {
  const articleId = Number(request.params.article_id);
  const { inc_votes } = request.body;

  patchVotesInArticle(articleId, inc_votes)
    .then((article) => {
      response.status(201).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = {
  getArticleById,
  getArticles,
  getCommentsByArticleId,
  postCommentByArticleId,
  patchArticleVotesById,
};
