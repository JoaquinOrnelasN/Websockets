import fs from "fs";
class productManagers {
  constructor(path) {
    this.path = `./src/data/${path}`;
  }
  addProduct = async ({title, description, code, price, stock, thumbnail}) => {
    if(!title || !description || !code || !price || !stock){
      return {success:false,message:`Verifique la totalidad de los datos solicitados para subir su producto `}
    }
    if (fs.existsSync(this.path)) {
      let info = await fs.promises.readFile(this.path, "utf-8");
      let result = JSON.parse(info);
      const codeCheck = products.find((el) => el.code == code);
      if (codeCheck) return {success:false,message:`El código del producto agregado ya existe. por favor agrega un nuevo producto`}
      let idProduct = result[result.length - 1].id + 1;
      let newProduct = {
        id: idProduct,
        title,
        description,
        code,
        price,
        status: true,
        stock,
        thumbnail,
      };
      result.push(newProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(result, null, 2));
      return {success:true,message:"Producto agregado correctamente:"}
    } else {
      let newProduct = {
        id: 1,
        title,
        description,
        code,
        price,
        status: true,
        stock,
        thumbnail,
      };
      await fs.promises.writeFile(
        this.path,
        JSON.stringify([newProduct], null, 2)
      );
      return {success:true,message:"Producto agregado correctamente:"}
    }
  };
  getProducts = async () => {
    if (fs.existsSync(this.path)) {
      let info = await fs.promises.readFile(this.path, "utf-8");
      let result = JSON.parse(info);
      return result;
    } else {
      return null;
    }
  };
  getProductById = async (id) => {
    if (fs.existsSync(this.path)) {
      let info = await fs.promises.readFile(this.path, "utf-8");
      let result = JSON.parse(info);
      let showProduct = result.find((product) => product.id==id);
      if (showProduct) {
        return showProduct;
      } else {
        return `Not found. Producto no encontrado.`;
      }
    } else {
      console.log(`No hay producto en existencia`);
    }
  };
  uptadeProduct = async (id, updatedProperties) => {
    if ((id, updatedProperties)) {
      if (fs.existsSync(this.path)) {
        let info = await fs.promises.readFile(this.path, "utf-8");
        let result = JSON.parse(info);
        let findProduct = result.find((product) => product.id == id);
        if (findProduct) {
          const productUpdates = result.map((product) => {
            if (product.id == id) {
              return { ...product, ...updatedProperties };
            }
            return product;
          });
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(productUpdates, null, 2)
          );
        } else {
          console.log(`El producto a actualizar no se ha encontrado.`);
        }
      } else {
        console.log(`No hay productos para actualizar.`);
      }
    } else {
      console.log(`Complete todos los campos para actualizar el producto.`);
    }
  };
  deleteProduct=async(id)=>{
    if(fs.existsSync(this.path)){
      let info = await fs.promises.readFile(this.path, "utf-8");
      let result = JSON.parse(info);
      let deleteProduct=result.filter((prod)=>prod.id!=id)
      result=deleteProduct
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(result, null, 2)
      );
      return `El producto se ha eliminado correctamente`
    }else{
      `No hay productos en existencia.`
    }
  }
}

const productManager = new productManagers("products.json");

export default productManager;