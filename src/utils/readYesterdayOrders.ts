import { SendYesterdayOrdersController } from "../controllers/SendYesterdayOrdersController";

const sendYesterdayOrdersController = new SendYesterdayOrdersController();

async function readYesterdayOrders(page: number) {
  do {
    try {
      Promise.all(await sendYesterdayOrdersController.handle(page));
      await new Promise((f) => setTimeout(f, 2000));
      page++;
    } catch {
      break;
    }
  } while (true);
}
export { readYesterdayOrders };
