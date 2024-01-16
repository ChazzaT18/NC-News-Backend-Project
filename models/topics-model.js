const db = require("../db/connection");

const fetchTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((data) => {
    return data.rows;
  });
};

module.exports = { fetchTopics };
