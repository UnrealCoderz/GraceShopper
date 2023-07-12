const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createNewProduct,
  updateProduct,
  getAllProductsBySellerId,
  getProductById,
  deleteProduct,
} = require("../db/models/products");
const { requireUser } = require("./utils");
const {
  getProductsInCartById,
  addProductToCart,
} = require("../db/models/productsInCart");

router.get("/", async (req, res) => {
  const Products = await getAllProducts();

  res.send(Products);
});

router.post("/", async (req, res, next) => {
  const { name, description, price } = req.body;
  const sellerId = req.user.id;
  const categoryId = req.user.id;
  // dont Know what we are doing for category Id yet so ignore that

  const newProduct = await createNewProduct(
    sellerId,
    name,
    description,
    price,
    categoryId
  );
  res.send(newProduct);
});

router.patch("/:productId", async (req, res, next) => {
  try {
    const Product = await getProductById(req.params.productId);
    const { name, description, price } = req.body;

    const updateFields = {};

    if (name) {
      updateFields.name = name;
    }
    if (description) {
      updateFields.description = description;
    }
    if (price) {
      updateFields.price = price;
    }

    console.log(updateFields);
    const updatedProduct = await updateProduct(req.params.productId, updateFields);
    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
});

router.delete("/:productId/:sellerId", requireUser, async (req, res, next) => {
  try {
    console.log('req.params is ', req.params)
    console.log('req.user is ', req.user)
    const Product = await getProductById(req.params.productId);
    console.log('product is ', Product)
    if (req.user.id === Product.usersid) {
      const deletedProduct = await deleteProduct(req.params.productId);
      res.send(deletedProduct);
      console.log('deleted product for the seller')
    } else {
      res.status(403);
      next({
        error: "userError",
        message: `User ${req.user.id} is not allowed to delete this product`,
        name: "User",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/:productId/cart", requireUser, async (req, res, next) => {
  try {
    const { productId, cartId, quantity } = req.body;
    const ProductId = req.params.productId;

    const check = await getProductsInCartById(ProductId);
    if (
      check.filter((Prod) => {
        return ProductId === Prod.productId;
      }).length > 0
    ) {
      next({
        error: "DuplicateError",
        message: `Product ID ${ProductId} already exists in Cart ID ${cartId}`,
        name: "Duplicate",
      });
    }

    const PR = await addProductToCart({
      productId,
      cartId,
      quantity,
    });

    res.send(PR);
  } catch (error) {
    next(error);
  }
});

module.exports = router;