const { deleteComment } = require('../models/comments-model')

const deleteCommentByCommentId = (request, response, next) => {
    const commentId = Number(request.params.comment_id);
    deleteComment(commentId)
      .then(() => {
        response.status(204).end()
      })
      .catch((err) => {
        next(err);
      });
  };

  module.exports = { deleteCommentByCommentId }