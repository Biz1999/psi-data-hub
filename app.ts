if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import { SendAllProductsToPSIController } from "./src/controllers/SendAllProductsToPSIController";
import { SendAllOrdersToPSIController } from "./src/controllers/SendAllOrdersToPSIController";

const sendAllProductsToPSIController = new SendAllProductsToPSIController();
const sendAllOrdersToPSIController = new SendAllOrdersToPSIController();

const bootstrap = async () => {
  // await sendAllOrdersToPSIController.handle();
  await sendAllProductsToPSIController
    .handle()
    .catch((err) => console.log(err));
  // console.log(response);
};

bootstrap();
