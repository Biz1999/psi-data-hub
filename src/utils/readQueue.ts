import { SendAllOrdersToPSIController } from "../controllers/SendAllOrdersToPSIController";

const sendAllOrdersToPSIController = new SendAllOrdersToPSIController();

async function readQueue(page: number) {
  await sendAllOrdersToPSIController.handle(page);
  Promise.resolve(setTimeout(() => readQueue(page + 1), 2000)).catch((error) =>
    Promise.reject(error)
  );
}

export { readQueue };
