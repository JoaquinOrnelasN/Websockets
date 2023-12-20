import express from "express";
const router = express.Router();
import productManager from "../managers/product_manager.js";

export let data = await productManager.getProducts();


router.get(`/`, async (req, res) => {
  res.render(`home`, {
    data,
    style:"style.css"
  });
});

router.get(`/products_realtime`, async (req, res) => {
  res.render(`products_realtime`, {
    style:"style.css"
  });
});
export default router;