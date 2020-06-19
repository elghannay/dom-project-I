const repository = require('./repository');

class productsRepository extends repository {}

module.exports = new productsRepository('products.json');
