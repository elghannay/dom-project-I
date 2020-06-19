const express = require('express');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/signup');
const signinTemplate = require('../../views/admin/signin');
const router = express.Router();
const { validationResult } = require('express-validator');
const {
  emailValidation,
  passwordValidation,
  passwordConfirmation,
  loginEmailCheck,
  loginPasswordCheck,
} = require('./validators');

router.get('/signup', (req, res) => {
  res.send(signupTemplate({}));
});

router.get('/signout', (req, res) => {
  res.session = null;
  res.send('you are logged out');
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate({}));
});

router.post(
  '/signin',
  [loginEmailCheck, loginPasswordCheck],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.send(signinTemplate({ errors }));
    else res.send('welcome back');
  }
);

router.post(
  '/signup',
  [emailValidation, passwordValidation, passwordConfirmation],
  async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    console.log(errors);
    if (confirmPassword !== password) {
      throw new Error('Passwords must match');
    }
    if (!errors.isEmpty()) {
      res.send(signupTemplate({ errors }));
    } else {
      // write the user to our file based storage
      const user = await usersRepo.create({ email, password });
      // store user id inside user cookie
      req.session.userID = user.id;
      res.send('account created');
    }
  }
);

module.exports = router;
