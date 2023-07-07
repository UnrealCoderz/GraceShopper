const express = require("express");
const {
  getCartById,
  getCartByUser,
} = require("../db");
const router = express.Router();

router.get("/cart/:cartId", async (req, res, next) => {
  const { cartId } = req.params;
  try {
    const cart = await getCartById(cartId);
    res.send(cart);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.get("/user/:userId/cart", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const cart = await getCartByUser(userId);
    res.send(cart);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = router;
