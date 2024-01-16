const { fetchArticleById, fetchArticles, fetchCommentsByArticleId } = require("../models/articles-model");

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
  fetchArticles()
    .then((articles) => {
      response.status(200).send({articles});
    })
    .catch((err) => {
      next(err);
    });
};

const getCommentsByArticleId = (request, response, next) => {
    const articleId = Number(request.params.article_id)
    fetchCommentsByArticleId(articleId)
    .then((comments) => {
    response.status(200).send({comments})
    })
}

module.exports = { getArticleById, getArticles, getCommentsByArticleId };
