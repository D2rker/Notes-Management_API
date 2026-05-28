const express = require('express');
const router = express.Router();

const { getAllProducts, getAllProductsTesting, createProduct, deleteProduct} = require('../controllers/product');

router.route("/").get(getAllProducts);
router.route("/testing").get(getAllProductsTesting);

router.route("/").post(createProduct);
router.route("/:id").delete(deleteProduct);

module.exports = router;
