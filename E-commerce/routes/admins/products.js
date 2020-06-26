const express = require('express');
const multer = require('multer');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

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
  [titleValidation, priceValidation, upload.single('image')],
  (req, res) => {
    const errors = validationResult(req);
    // if (!errors.isEmpty()) res.send(console.log(errors));
    // else res.send('submitted');
    console.log(req.file);
    res.send('submitted');
  }
);

module.exports = router;
