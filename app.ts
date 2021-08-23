if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import { ListAllProductsController } from "./src/controllers/ListAllProductsController";
import { SendAllProductsToPSIController } from "./src/controllers/SendAllProductsToPSIController";

const listAllProductsController = new ListAllProductsController();
const sendAllProductsToPSIController = new SendAllProductsToPSIController();

const bootstrap = async () => {
  const response = await sendAllProductsToPSIController.handle();
  // console.log(response);
};

bootstrap();
