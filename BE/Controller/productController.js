const { Product } = require("../Model/productModel");

const createProduct = async (req, res) => {
    var newProduct = new Product(req.body);
    newProduct.save().then((doc) => res.status(201).send(doc));
}

const getProducts = async (req, res) => {
    const allProducts = await Product.find();
    res.send(allProducts);
  }

module.exports = { createProduct, getProducts }