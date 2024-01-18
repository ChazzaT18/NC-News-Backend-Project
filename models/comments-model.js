const db = require("../db/connection");

const deleteComment = (commentId) => {
  if (isNaN(commentId)) {
    return Promise.reject({
      statusCode: 400,
      msg: "comment_id must be a number",
    });
  }

  return db
    .query("DELETE FROM comments WHERE comment_id = $1 RETURNING *;", [
      commentId,
    ])
    .then((result) => {
      const deletedRows = result.rowCount;

      if (deletedRows === 0) {
        return Promise.reject({
          statusCode: 404,
          msg: "Comment not found",
        });
      }

      return Promise.resolve();
    });
};

module.exports = { deleteComment };
