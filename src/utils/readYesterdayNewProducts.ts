import { SendYesterdayNewProductsController } from "../controllers/SendYesterdayNewProductsController";

const sendYesterdayNewProductsController =
  new SendYesterdayNewProductsController();

async function readYesterdayNewProducts(page: number) {
  await sendYesterdayNewProductsController.handle(page);

  Promise.resolve(
    setTimeout(() => readYesterdayNewProducts(page + 1), 5000)
  ).catch((error) => Promise.reject(error));
}

export { readYesterdayNewProducts };
