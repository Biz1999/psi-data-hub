if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import { SendAllProductsToPSIController } from "./src/controllers/SendAllProductsToPSIController";
import { SendAllOrdersToPSIController } from "./src/controllers/SendAllOrdersToPSIController";
import { readProductQueue } from "./src/utils/readProductsQueue";
import { readQueue } from "./src/utils/readQueue";
import { readYesterdayOrders } from "./src/utils/readYesterdayOrders";
import { readYesterdayStocks } from "./src/utils/readYesterdayStocks";

const sendAllProductsToPSIController = new SendAllProductsToPSIController();
const sendAllOrdersToPSIController = new SendAllOrdersToPSIController();

const bootstrap = async () => {
  // page atual = 45
  const page = 1;
  // const products = await readProductQueue(page);
  await readYesterdayStocks(page);
  // const orders = await readQueue(page);
  // await readYesterdayOrders(page);
  // Promise.all([products, orders]);
};

bootstrap();
