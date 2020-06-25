const template = require('../../template');
const { getError } = require('../../helpers');

module.exports = ({ errors }) => {
  return template({
    content: `
<form method="post" enctype="multipart/form-data">
    <input type="text" title=" title" placeholder="title" name="title">
    <input type="text" name="price" placeholder="price">
    <input type="file" name="image">
    <button>submit</button>
</form>
        `,
  });
};
