const { getToken } = require('../../util/token');
const Post = require('../../model/post');
const { UserInputError } = require('apollo-server');

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const user = getToken(context);

      if (body.trim() === '') {
        throw new UserInputError('Empty Comment', {
          errors: {
            body: 'Comment body must not empty',
          },
        });
      }

      const post = await Post.findById(postId);

      if (!post) {
        throw new Error('Post not found');
      }

      post.comments.unshift({
        body,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      await post.save();
      return post;
    },

    async deleteComment(_, { postId, commentId }, context) {
      const user = getToken(context);

      const post = await Post.findById(postId);

      if (!post) {
        throw new Error('Post not found');
      }

      const commentIndex = post.comments.findIndex((c) => c.id === commentId);

      if (post.comments[commentIndex].username === user.username) {
        post.comments.splice(commentIndex, 1);
        await post.save();
        return post;
      } else {
        throw new Error('Action not allowed');
      }
    },
  },
};
