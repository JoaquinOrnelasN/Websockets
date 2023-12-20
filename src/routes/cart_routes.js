import { Router } from "express";
import CartManager from "../managers/cart_manager.js";
import productManager from "../managers/product_manager.js";
const productMananger=productManager;

const router = Router();
const manager = CartManager;

router.post("/", async (req, res) => {
    res.send(await carrito.addCart());
  });
  router.get("/:cid", async (req, res) => {
    res.send(await carrito.getCart(req.params.cid));
  });
  router.post("/:cid/products/:pid", async (req, res) => {
    if (req.params.cid && req.params.pid) {
      let idCarrito;
      let idProducto;
      if(await carrito.getCart(req.params.cid)==`Not found. Carrito no encontrado.`){
          idCarrito=false
      }else{
          idCarrito=true
      }
      if(await productMananger.getProductById(req.params.pid)==`Not found. Producto no encontrado.`){
          idProducto=false
      }else{
          idProducto=true
      }
      if(idProducto&&idCarrito){
      await carrito.addProductInCart(req.params.cid,req.params.pid)
      res.send(`El producto ha sido agregado.`)
      }else if(idCarrito){
          res.send(`Id del carrito: correcto. Id del producto: incorrecto.`)
      }else if(idProducto){
          res.send(`Id del producto: correcto. Id del carrito: incorrecto.`)
      }else{
          res.send(`Id del carrito: incorrecto. Id del producto: incorrecto.`)
      }
    } else {
      res.send(`Ingresa todos los parametros para agregar al carrito.`);
    }
  });
  
  export default router;
