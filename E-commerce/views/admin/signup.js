const template = require('./../template');

module.exports = ({ req }) => {
  return template({
    content: `
<form method="post">
    <input name="email" placeholder="email">
    <input name="password" placeholder="password">
    <input name="confirmPassword" placeholder="confirm password">
    <button>sign up</button>
</form>
  `,
  });
};
