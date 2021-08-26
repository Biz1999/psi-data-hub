import { SendAllProductsToPSIController } from "../controllers/SendAllProductsToPSIController";

const sendAllProductsToPSIController = new SendAllProductsToPSIController();

async function readProductQueue(page: number) {
  await sendAllProductsToPSIController.handle(page);
  Promise.resolve(setTimeout(() => readProductQueue(page + 1), 1800500)).catch(
    (error) => Promise.reject(error)
  );
}

export { readProductQueue };
