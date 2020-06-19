const usersRepo = require('../../repositories/users');
const { check } = require('express-validator');

module.exports = {
  emailValidation: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('must be a valid email')
    .custom(async (email) => {
      const existingUser = await usersRepo.getOneBy({ email });
      if (existingUser) throw new Error('this email is already in use');
    }),
  passwordValidation: check('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Must be between 4 and 20 characters'),

  passwordConfirmation: check('confirmPassword')
    .trim()
    .isLength({ min: 8, max: 20 })
    .isLength({ min: 4, max: 20 })
    .withMessage('Must be between 4 and 20 characters'),

  loginEmailCheck: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('must provide a valid email')
    .custom(async (email) => {
      const user = await usersRepo.getOneBy({ email });
      if (!user) throw new Error('Email not found');
    }),
  loginPasswordCheck: check('password')
    .trim()
    .custom(async (password, { req }) => {
      const user = await usersRepo.getOneBy({ email: req.body.email });
      if (!user) throw new Error('invalid password');
      const validPassword = await usersRepo.comparePasswords(
        user.password,
        password
      );
      if (!validPassword) throw new Error('password is wrong');
    }),
};
