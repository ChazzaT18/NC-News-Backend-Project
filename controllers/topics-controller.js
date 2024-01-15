const { fetchTopics } = require('../models/topics-model')

const getTopics = ((request, response) => {
    console.log(request)
    fetchTopics().then((topic) => {
        response.status(200).send({ topic: topic });
      });
})


module.exports = { getTopics };