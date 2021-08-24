if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import { ListAllProductsController } from "./src/controllers/ListAllProductsController";
import { SendAllProductsToPSIController } from "./src/controllers/SendAllProductsToPSIController";
import { SendAllOrdersToPSIController } from "./src/controllers/SendAllOrdersToPSIController";

const sendAllProductsToPSIController = new SendAllProductsToPSIController();
const sendAllOrdersToPSIController = new SendAllOrdersToPSIController();

const bootstrap = async () => {
  const response = await sendAllOrdersToPSIController.handle();
  console.log(response);
};

bootstrap();
