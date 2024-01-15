const { fetchTopics, fetchEndPoints } = require('../models/topics-model')

const getTopics = ((request, response) => {
    fetchTopics().then((topic) => {
        response.status(200).send({ topic });
      });
})

const getEndPoints = (request, response) => {
    const endPoint = fetchEndPoints();
    console.log(endPoint);
    response.status(200).send({ endPoint });
  };

module.exports = { getTopics, getEndPoints };