import { SendYesterdayOrdersController } from "../controllers/SendYesterdayOrdersController";

const sendYesterdayOrdersController = new SendYesterdayOrdersController();

async function readYesterdayOrders(page: number) {
  await sendYesterdayOrdersController.handle(page);

  Promise.resolve(
    setTimeout(() => readYesterdayOrders(page + 1), 150500)
  ).catch((error) => Promise.reject(error));
}

export { readYesterdayOrders };
