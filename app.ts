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
  const page = 45;
  await readQueue(page);
  // await readProductQueue(page);
  // await sendAllOrdersToPSIController.handle(page);
};

bootstrap();
