const express = require('express');
const router = express.Router();
const productsRepo = require('../../repositories/products');

router.get('./admins/products', (req, res) => {});
router.get('./admins/products/new', (req, res) => {});

module.exports = router;
