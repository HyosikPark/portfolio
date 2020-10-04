const User = require('../model/user');

module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  const blankRegx = /\s/g;
  const emailRegx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  if (username.trim() === '' || username.match(blankRegx)) {
    errors.username = 'username에 공백이 허용되지 않습니다.';
  }

  if (!email.match(emailRegx)) {
    errors.email = '이메일 형식이 올바르지 않습니다.';
  }

  if (email.trim() === '' || email.match(blankRegx)) {
    errors.email = 'email에 공백이 허용되지 않습니다.';
  }

  if (password.trim() === '' || password.match(blankRegx)) {
    errors.password = '비밀번호를 입력해주십시오.';
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = '비밀번호가 동일하지 않습니다.';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  const blankRegx = /\s/g;

  if (username.trim() === '' || username.match(blankRegx)) {
    errors.username = 'username에 공백이 허용되지 않습니다.';
  }

  if (password.trim() === '' || password.match(blankRegx)) {
    errors.password = '비밀번호를 입력해주십시오.';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
