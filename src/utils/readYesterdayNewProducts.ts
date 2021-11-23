import { SendYesterdayNewProductsController } from "../controllers/SendYesterdayNewProductsController";
import { PostNewStocksToPSI } from "../services/PostNewStocksToPSI";

const sendYesterdayNewProductsController =
  new SendYesterdayNewProductsController();

async function readYesterdayNewProducts(page: number) {
  const fs = require("fs");
  let depositos = [];
  do {
    try {
      depositos.push(
        ...(await sendYesterdayNewProductsController.handle(page))
      );
      await new Promise((f) => setTimeout(f, 2000));
      page++;
    } catch {
      break;
    }
  } while (true);

  fs.writeFileSync(
    `src/utils/depositos.json`,
    JSON.stringify(depositos, null, 2)
  );

  const promises = depositos.map(async (deposito, index) => {
    return PostNewStocksToPSI(deposito, index);
  });

  console.log(promises.length);
  return Promise.all(promises);
  return console.log("ok");
}

export { readYesterdayNewProducts };
