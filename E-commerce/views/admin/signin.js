const template = require('./../template');

module.exports = () => {
  return template({
    content: `
<form method="post">
    <input name="email" placeholder="email">
    <input name="password" placeholder="password">
    <button>sign in</button>
</form>
  `,
  });
};
