import { Router } from "express";
import productManagers from "../managers/product_manager.js";

const router = Router()
const productManager = productManagers;


router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  if (products) {
    if (req.query.limit <= products.length && req.query.limit > 0) {
      res.send(products.slice(0, req.query.limit));
    } else if (req.query.limit) {
      res.send(`El límite de productos no puede exceder a los productos dados, productos actuales: 
      ${products.map((p) => `<h1>${p.title}</h1>`)}`);
    } else {
      res.send(products);
    }
  } else {
    res.send(`No hay productos disponibles.`);
  }
});

router.post("/", async (req, res) => {
  let newProduct = req.body;
  const response = await productManager.addProduct(newProduct);
  if (!response.success) {
    return res.status(400).send(response.message);
  }
  res.status(200).send(response.message);
});

router.get("/:pid", async (req, res) => {
  let product = await productManager.getProductById(req.params.pid);
  product ? res.send(product) : res.send("El id del producto no existe.");
});

router.put("/:pid", async (req, res) => {
  let product = await productManager.getProductById(req.params.pid);
  if (product) {
    let newInfo = req.body;
    if (newInfo) {
      await productManager.uptadeProduct(req.params.pid, newInfo);
      res.send(`Ha sido actualizado correctamente.`);
    } else {
      res.send(`Ingresa los datos a modificar.`);
    }
  } else {
    res.send("El id del producto no existe.");
  }
});

router.delete("/:pid", async (req, res) => {
  let product = await productManager.getProductById(req.params.pid);
  if (product) {
    res.send(await productManager.deleteProduct(req.params.pid));
  } else {
    res.send("El id del producto no existe.");
  }
});

export default router;