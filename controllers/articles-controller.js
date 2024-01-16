const { fetchArticleById } = require('../models/articles-model')

const getArticleById = (request, response, next) => {
    const articleId = Number(request.params.article_id)
    fetchArticleById(articleId).then((article) => {
        response.status(200).send({article})
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = { getArticleById };