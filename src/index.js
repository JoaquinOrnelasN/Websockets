import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import _dirname from "./utils.js";
import product_routes from "./routes/product_routes.js";
import cart_routes from "./routes/cart_routes.js";
import homeHandlebar from "./routes/view_routes.js";
import productManagers from "./managers/product_manager.js";
const productMananger = productManagers;
let data = await productMananger.getProducts();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(_dirname + `/public`));

const httpServer = app.listen(8000, () => {
  console.log(`servidor escuchando en el puerto 8000`);
});
const socketServer = new Server(httpServer);

app.engine(`handlebars`, handlebars.engine());
app.set(`views`, "src/views");
app.set(`view engine`, `handlebars`);

app.use("/api/products", product_routes);
app.use("/api/carts", cart_routes);
app.use("/", homeHandlebar);

socketServer.on(`connection`, async (socket) => {
  console.log(`Nuevo cliente conectado`);
  socket.emit(`datos`, await data);
});