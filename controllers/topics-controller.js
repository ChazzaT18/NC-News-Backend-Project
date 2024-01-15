const { fetchTopics, fetchEndPoints, fetchArticleById } = require('../models/topics-model')

const getTopics = ((request, response) => {
    fetchTopics().then((topic) => {
        response.status(200).send({ topic });
      });
})

const getEndPoints = (request, response) => {
    const endPoint = fetchEndPoints();
    response.status(200).send({ endPoint });
  };

const getArticleById = (request, response, next) => {
    const articleId = Number(request.params.article_id)
    fetchArticleById(articleId).then((article) => {
        console.log(article)
        response.status(200).send({article})
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = { getTopics, getEndPoints, getArticleById};