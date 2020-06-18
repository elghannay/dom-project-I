const express = require('express');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/signup');
const signinTemplate = require('../../views/admin/signin');
const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.get('/signout', (req, res) => {
  res.session = null;
  res.send('you are logged out');
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate());
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await usersRepo.getOneBy({ email });
  if (!user) return res.send('Email not found');
  const validUser = UsersRepository.comparePasswords(user.password, password);
  if (!validUser) return res.send('password is wrong');
  res.send('welcome back');
});

router.post('/signup', async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send('this email is already in use');
  }
  if (password !== confirmPassword) res.send('password must match');
  res.send('account created');

  // write the user to our file based storage
  const user = await usersRepo.create({ email, password });
  // store user id inside user cookie
  req.session.userID = user.id;
});

module.exports = router;
