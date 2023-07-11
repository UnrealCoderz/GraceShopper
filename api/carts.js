const express = require("express");
const {
  getCartByUserId,
  createNewCart
} = require("../db");
const router = express.Router();

router.post("/cart/userId", async (req, res, next) => {
  const { status } = req.body;
  try {
    const newCart = await createNewCart(req.params.userId, status);
    res.send(newCart)
    console.log('User cart has been established')
  } catch (error) {
    next(error)
  }
});

router.get("/cart/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const cart = await getCartByUserId(userId);
    res.send(cart);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = router;
