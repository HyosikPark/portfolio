const Post = require('../../model/post');
const { getToken } = require('../../util/token');

module.exports = {
  Query: {
    async getPosts() {
      const posts = await Post.find().sort({ createdAt: -1 });
      return posts;
    },

    async getPost(_, { postId }) {
      const post = await Post.findById(postId);
      if (!post) {
        throw new Error('Post not found');
      }
      return post;
    },
  },

  Mutation: {
    async createPost(_, { body }, context) {
      const user = getToken(context);

      if (body.trim() === '') {
        throw new Error('내용을 입력하세요.');
      }

      const newPost = new Post({
        username: user.username,
        body,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      return post;
    },

    async deletePost(_, { postId }, context) {
      const user = getToken(context);

      const post = await Post.findById(postId);

      if (!post) {
        throw new Error('Post not found');
      }

      if (user.username === post.username) {
        await post.delete();
        return 'Post deleted successfully';
      } else {
        throw new Error('action not allowed');
      }
    },

    async likePost(_, { postId }, context) {
      const user = getToken(context);

      const post = await Post.findById(postId);

      if (!post) {
        throw new Error('Post not found');
      }

      if (post.likes.find((like) => like.username === user.username)) {
        post.likes = post.likes.filter(
          (like) => like.username !== user.username
        );
      } else {
        post.likes.unshift({
          username: user.username,
          createdAt: new Date().toISOString(),
        });
      }

      await post.save();
      return post;
    },
  },
};
