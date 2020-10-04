const User = require('../../model/user');
const Post = require('../../model/post');
const { UserInputError } = require('apollo-server');
const { validateRegisterInput } = require('../../util/validators');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../../util/token');

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const user = await User.findOne({ username });

      if (!user) {
        throw new UserInputError(
          'username 또는 비밀번호가 일치하지 않습니다.',
          {
            errors: {
              username: 'username 또는 비밀번호가 일치하지 않습니다.',
            },
          }
        );
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new UserInputError(
          'username 또는 비밀번호가 일치하지 않습니다.',
          {
            errors: {
              password: 'username 또는 비밀번호가 일치하지 않습니다.',
            },
          }
        );
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      const existUsername = await User.findOne({ username });
      const existEmail = await User.findOne({ email });

      if (existUsername) {
        throw new UserInputError('이미 존재하는 username입니다.', {
          errors: {
            username: '이미 존재하는 username입니다.',
          },
        });
      }

      if (existEmail) {
        throw new UserInputError('이미 존재하는 email입니다.', {
          errors: {
            email: '이미 존재하는 email입니다.',
          },
        });
      }

      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
