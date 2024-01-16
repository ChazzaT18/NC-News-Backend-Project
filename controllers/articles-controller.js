const { fetchArticleById, fetchArticles, fetchCommentsByArticleId, postComment } = require("../models/articles-model");

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
    .catch((err) => {
        next(err)
    })
}

const postCommentByArticleId = (request, response, next) => {

    const articleId = Number(request.params.article_id)
    const {username, body} = request.body
    postComment(articleId, username, body)
    .then((comment) => {
        response.status(201).send({comment})
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = { getArticleById, getArticles, getCommentsByArticleId, postCommentByArticleId };
