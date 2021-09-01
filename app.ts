if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import { SendAllProductsToPSIController } from "./src/controllers/SendAllProductsToPSIController";
import { SendAllOrdersToPSIController } from "./src/controllers/SendAllOrdersToPSIController";
import { readProductQueue } from "./src/utils/readProductsQueue";
import { readQueue } from "./src/utils/readQueue";

const sendAllProductsToPSIController = new SendAllProductsToPSIController();
const sendAllOrdersToPSIController = new SendAllOrdersToPSIController();

const bootstrap = async () => {
  // page atual = 45
  // const page = 2;
  // const products = await readProductQueue(page);
  const pages = 1;
  const orders = await readQueue(pages);

  // Promise.all([products, orders]);
};

bootstrap();
