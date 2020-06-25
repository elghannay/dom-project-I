const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admins/auth');
const productsRouter = require('./routes/admins/products');

const app = express();
// tell express to look at the public folder and make everything inside available
// to the outside word.
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: 'session',
    keys: ['fdsfwgjvjgjGDFDS'],
  })
);
// add it after the middleware
app.use(authRouter);
app.use(productsRouter);

app.listen(3000, () => {
  console.log('listening');
});
