import { SendYesterdayProductsController } from "../controllers/SendYesterdayProductsController";

const sendYesterdayProductsController = new SendYesterdayProductsController();

async function readYesterdayStocks(page: number) {
  await sendYesterdayProductsController.handle(page);

  Promise.resolve(
    setTimeout(() => readYesterdayStocks(page + 1), 1200500)
  ).catch((error) => Promise.reject(error));
}

export { readYesterdayStocks };
