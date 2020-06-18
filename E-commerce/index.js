const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: 'session',
    keys: ['fdsfwgjvjgjGDFDS'],
  })
);

app.get('/signup', (req, res) => {
  res.send(`
<form method="post">
    <input name="email" placeholder="email">
    <input name="password" placeholder="password">
    <input name="confirmPassword" placeholder="confirm password">
    <button>sign up</button>
</form>
  `);
});

app.get('/signout', (req, res) => {
  res.session = null;
  res.send('you are logged out');
});

app.get('/signin', (req, res) => {
  res.send(`
<form method="post">
    <input name="email" placeholder="email">
    <input name="password" placeholder="password">
    <button>sign in</button>
</form>
  `);
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await usersRepo.getOneBy({ email });
  if (!user) return res.send('Email not found');
  const validUser = usersRepo.comparePasswords(user.password, password);
  if (!validUser) return res.send('password is wrong');
  res.send('welcome back');
});

app.post('/signup', async (req, res) => {
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

app.listen(3000, () => {
  console.log('listening');
});
