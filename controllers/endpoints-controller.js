const { fetchEndPoints} = require('../models/endpoints-model')
const getEndPoints = (request, response) => {
    const endPoints = fetchEndPoints();
    response.status(200).send({ endPoints });
  };

  module.exports = { getEndPoints};