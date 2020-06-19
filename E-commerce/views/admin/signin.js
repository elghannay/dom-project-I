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
    <button>sign in</button>
</form>
  `,
  });
};
