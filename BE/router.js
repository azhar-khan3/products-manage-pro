const express = require('express');

const auth = require('./middleware/auth');
const { registerUser, loginUser } = require('./Controller/userController');
const { createProduct, getProducts } = require('./Controller/productController');

const router = express.Router();

router.route("/register")
    .post(registerUser);

router.route('/login')
         .post(loginUser);

router.route('/addProduct')
          .post(createProduct);

router.route('/products')
           .get(auth, getProducts);

module.exports = router