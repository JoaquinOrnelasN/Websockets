import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = `./src/data/${path}`;
  }
  addCart = async () => {
    if (fs.existsSync(this.path)) {
      let info = await fs.promises.readFile(this.path, "utf-8");
      let result = JSON.parse(info);
      let idCart = result[result.length - 1].id + 1;
      let newCart = {
        id: idCart,
        products: [],
      };
      result.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(result, null, 2));
      return `Se ha creado un carrito nuevo. Id del carrito=${idCart}`;
    } else {
      let newCart = {
        id: 1,
        products: [],
      };
      await fs.promises.writeFile(
        this.path,
        JSON.stringify([newCart], null, 2)
      );
      return `Se ha creado un carrito nuevo. Id del carrito=1`;
    }
  };
  getCart = async (id) => {
    if (fs.existsSync(this.path)) {
      let info = await fs.promises.readFile(this.path, "utf-8");
      let result = JSON.parse(info);
      let showProduct = result.find((cart) => cart.id == id);
      if (showProduct) {
        return showProduct;
      } else {
        return `Not found. Carrito no encontrado, verifique el id.`;
      }
    } else {
      return `No existe carrito con ese id.`;
    }
  };
  addProductInCart = async (id, product) => {
    let info = await fs.promises.readFile(this.path, "utf-8");
    let result = JSON.parse(info);
    let addProduct = result.map((prod) => {
      if (prod.id == id) {
        if (prod.products.length > 0) {
          let repeatProduct = prod.products.filter(
            (prod) => prod.product == product
          );
          if (repeatProduct.length > 0) {
            let changeQuantity = repeatProduct.map((objeto) => {
              return { ...objeto, quantity: objeto.quantity + 1 };
            });
            let newProdProducts = prod.products.map((product) => {
              if (product.product == product) {
                product=changeQuantity[0]
                return product
              }
              return product;
            });
            prod.products=newProdProducts
            return prod
          } else {
            let newProduct = {
              product: Number(product),
              quantity: 1,
            };
            prod.products.push(newProduct);
          }
        } else {
          let newProduct = {
            product: Number(product),
            quantity: 1,
          };
          prod.products.push(newProduct);
        }
      }
      return prod;
    });
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(addProduct, null, 2)
    );
    
  };
}
const cart = new CartManager("cart.json");
export default cart;