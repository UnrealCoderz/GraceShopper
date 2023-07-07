const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createNewProduct,
  updateProduct,
  getAllProductsBySellerId,
  getProductById,
} = require("../db/models/products");
const { requireUser } = require("./utils");

router.get("/", async (req, res) => {
  const Products = await getAllProducts();

  res.send(Products);
});

router.post("/", async (req, res, next) => {
  const { name, description, price } = req.body;
  const userId = req.user.id;
  const categoryId = req.user.id;
  // dont Know what we are doing for category Id yet so ignore that

  const newProduct = await createNewProduct(
    userId,
    name,
    description,
    price,
    categoryId
  );
  res.send(newProduct);
});

router.patch("/:productId", async (req, res, next) => {
  try {
    const id = req.params.productId;
    const Product = await getProductById(id);
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

    const updatedProduct = await updateProduct(id, ...updateFields);
    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
});

router.delete("/:productId", requireUser, async (req, res, next) => {
try{
   const Product = await getProductById(req.params.productId)
   if(req.user.id !== Product.usersid) {
    res.status(403)
    next({
      error: "userError",
      message: `User ${req.user.id} is not allowed to delete this product`,
      name: "User"
    })

    
   }
}

});
