const db = require("../db/connection");
const endPointData = require('../endpoints.json')


const fetchTopics = () => {
    return db.query(`SELECT * FROM topics;`).then((data)=>{
        return data.rows;
    })
};

const fetchEndPoints = () => {
    return endPointData
}

module.exports = { fetchTopics, fetchEndPoints }