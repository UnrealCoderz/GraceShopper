require("dotenv").config();
/* eslint-disable no-useless-catch */
const express = require("express");
const jwt = require("jsonwebtoken");
const { addProductToCart, getProductsInCartById, deleteProductsInCart, updateProductsInCart } = require("../db/models/productsInCart");
const router = express.Router();

router.post("/cartproducts", async (req, res, next) => {
    const { productId, cartId, quantity } = req.body;
    try {
        const productInCart = {
            productId: productId,
            cartId: cartId,
            quantity: quantity
        }
        const addedCartItem = await addProductToCart(productInCart);
        res.send(addedCartItem, 'Successfully added product to cart');
    } catch (error) {
        next(error);
    }
});

router.get("/cartproducts", async (req, res, next) => {
    try {
        const cartItems = await getProductsInCartById(req.body.id);
        res.send(cartItems, 'Here are your cart items');

    } catch (error) {
        next(error);
    }
});

// router.patch("/cartproducts/:cartId", async (req, res, next) => {
//     try {
//         // grab all cart items
//         // check which item is being removed or added
//         const products = await getProductsInCartById(req.params.cartId);
//         products.filter()
//         const updatedItems = await updateProductsInCart();
//     } catch (error) {
//         next(error);
//     }
// });

router.delete("/cartproduct", async (req, res, next) => {

    try {
        const removedCartItem = await deleteProductsInCart(req.body.id)
        res.send(removedCartItem, 'Successfully deleted product from cart');
    } catch (error) {
        next(error);
    }
})