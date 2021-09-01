import { SendAllProductsToPSIController } from "../controllers/SendAllProductsToPSIController";

const sendAllProductsToPSIController = new SendAllProductsToPSIController();

async function readProductQueue(page: number) {
  await sendAllProductsToPSIController.handle(page);
  Promise.resolve(setTimeout(() => readProductQueue(page + 1), 10000)).catch(
    (error) => Promise.reject(error)
  );
  // Promise.resolve(setTimeout(() => readProductQueue(page + 1), 1200500)).catch(
  //   (error) => Promise.reject(error)
  // );
}

export { readProductQueue };
