const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// watch for any incoming requests of method get and
// a route of  '/' >>> route handler.
app.get('/', (req, res) => {
  res.send(`
<form method="post">
    <input name="email" placeholder="email">
    <input name="password" placeholder="password">
    <input name="confirmPassword" placeholder="confirm password">
    <button>sign up</button>
</form>
  `);
});

// middleware definition router
// they are in the middle of a request/response handler.
// the middle ware implementation since a lot of type of req
// besides a 'POST' request can have a body and in our case
// we handle only post requests.
// so we make use of a library called bodyParser that has
// a lot of middleware in it.

// const bodyParser = (req, res, next) => {
//   if (req.method === 'POST') {
//     // on() behave as an event listener for a 'data' event,
//     // so whenever the req receives data the callback will be
//     // triggered
//     req.on('data', (data) => {
//       const rawInput = data.toString('utf8').split('&');
//       const formData = {};
//       for (const input of rawInput) {
//         const [name, value] = input.split('=');
//         formData[name] = value;
//       }
//       req.body = formData;
//       next();
//     });
//   } else next();
// };

// tell the router to watch for incoming request of method 'post'
//  and a path of '/'
// bodyParser.urlEncoded({ extended: true }); will process the req bit by bit
// and parse it and make that information available at req.body
app.post('/', (req, res) => {
  console.log(req.body);
  res.send('account created');
});

app.listen(3000, () => {
  console.log('listening');
});
