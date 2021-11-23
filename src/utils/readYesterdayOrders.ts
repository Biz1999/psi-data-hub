import { SendYesterdayOrdersController } from "../controllers/SendYesterdayOrdersController";
import { postOrdersToPSI } from "../services/PostOrdersToPSI";

const sendYesterdayOrdersController = new SendYesterdayOrdersController();

async function readYesterdayOrders(page: number) {
  const fs = require("fs");
  const ordersToPSI = [];
  do {
    try {
      ordersToPSI.push(...(await sendYesterdayOrdersController.handle(page)));
      await new Promise((f) => setTimeout(f, 2000));
      page++;
    } catch {
      break;
    }
  } while (true);

  fs.writeFileSync(
    `src/utils/orders.json`,
    JSON.stringify(ordersToPSI, null, 2)
  );

  // let total = 0;
  // let desconto = 0;
  // let desconto_itens = 0;
  // let total_gross_profit = 0;
  // let custo = 0;
  // ordersToPSI.forEach((order) => {
  //   total += order.total_value;
  //   order.products.forEach((produto) => {
  //     desconto_itens += produto.total_discount;
  //     total_gross_profit += produto.total_gross_profit;
  //     custo += produto.unitary_cost_value * produto.quantity;
  //   });
  //   desconto += order.total_discount;
  // });

  // console.log("Total", total);
  // console.log("Desconto", desconto);
  // console.log("Descontos que estão nos itens: ", desconto_itens);
  // console.log("Lucro: ", total_gross_profit);
  // console.log("Custo: ", custo);

  const promises = ordersToPSI.map((order, index) => {
    return postOrdersToPSI(order, index);
  });

  console.log(promises.length);

  return Promise.all(promises);
  return console.log("ok");
}
export { readYesterdayOrders };
