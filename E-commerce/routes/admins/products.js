const express = require('express');
const router = express.Router();
const productsRepo = require('../../repositories/products');
const productTemplate = require('../../views/admin/products/new');
const { validationResult } = require('express-validator');
const { titleValidation, priceValidation } = require('./validators');

router.get('/admins/products', (req, res) => {});
router.get('/admins/products/new', (req, res) => {
  res.send(productTemplate({}));
});

router.post(
  '/admins/products/new',
  [titleValidation, priceValidation],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.send(console.log(errors));
    else res.send('submitted');
  }
);

module.exports = router;
