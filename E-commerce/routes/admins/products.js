const express = require('express');
const router = express.Router();
const productsRepo = require('../../repositories/products');
const productTemplate = require('../../views/admin/products/new');
router.get('./admins/products', (req, res) => {});
router.get('./admins/products/new', (req, res) => {
  res.send(productTemplate({}));
});

module.exports = router;
