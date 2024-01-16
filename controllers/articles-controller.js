const { fetchArticleById, fetchArticles } = require("../models/articles-model");

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

module.exports = { getArticleById, getArticles };
