const template = require('./../template');
const { getError } = require('../helpers');

module.exports = ({ errors }) => {
  return template({
    content: `
<form method="post">
    <input name="email" placeholder="email">
    ${getError(errors, 'email')}
    <input name="password" placeholder="password">
    ${getError(errors, 'password')}
    <input name="confirmPassword" placeholder="confirm password">
    ${getError(errors, 'confirmPassword')}
    <button>sign up</button>
</form>
  `,
  });
};

// props : email || password || confirmPassword
// if there is no error or the exact prop does
// not generate an error
// error.mapped() ===
//   {
//     email: {
//       msg: 'invalid email',
//     },
//     password: {
//       msg: 'invalid email',
//     },
//     confirmPassword: {
//       msg: 'invalid password',
//     },
//   };
// only if there are errors show them inside the form
