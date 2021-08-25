import { Pedido } from "../dtos/OrdersBling";
import { Order } from "../dtos/OrdersPSI";
import api from "../services/sendToPSI";
import { format } from "date-fns";
import { ListAllOrdersController } from "./ListAllOrdersController";
import { paymentMethod } from "../utils/paymentMethod";
import { storeSlugConvert } from "../utils/storeSlugConvert";
import { postOrdersToPSI } from "../services/PostOrdersToPSI";

class SendAllOrdersToPSIController {
  async handle() {
    const fs = require("fs");
    const listAllOrdersController = new ListAllOrdersController();
    let page = 2;
    // (async () => {
    while (page < 10) {
      const response = await listAllOrdersController.handle(page);
      const orders = response.map((pedido: Pedido, index: number) => {
        return {
          id: index,
          total_value: Number(pedido.pedido.totalvenda),
          payment_method:
            pedido.pedido.parcelas !== undefined
              ? paymentMethod(
                  pedido.pedido.parcelas[0].parcela?.forma_pagamento.descricao
                )
              : "CASH",
          total_discount: parseFloat(pedido.pedido.desconto),
          store_slug: storeSlugConvert(pedido.pedido.loja),
          date: format(new Date(pedido.pedido.data), "yyyy-MM-dd 00:mm:ss"),
          reference: pedido.pedido.numero,
          products: pedido.pedido.itens?.map((item, index) => {
            const product = {
              sku: item.item.codigo,
              total_value:
                Number(item.item.quantidade) * Number(item.item.valorunidade),
              total_discount:
                Number(item.item.descontoItem) * Number(item.item.quantidade),
              total_gross_profit:
                Number(item.item.precocusto) * Number(item.item.quantidade),
              unitary_value: Number(item.item.valorunidade),
              unitary_cost_value: Number(item.item.precocusto),
              unitary_gross_profit:
                Number(item.item.valorunidade) - Number(item.item.precocusto),
              quantity: Number(item.item.quantidade),
            };
            return Object.fromEntries(
              Object.entries(product).filter(([_, v]) => v != null && v !== "")
            );
          }),
        };
      }) as Order[];

      const ordersToPSI = orders.map((order) => {
        return Object.fromEntries(
          Object.entries(order).filter(([_, v]) => v != null)
        );
      });

      // fs.writeFileSync(
      //   `src/utils/orders.json`,
      //   JSON.stringify(ordersToPSI, null, 2)
      // );
      console.log(page);

      const bar = new Promise((resolve, reject) => {
        ordersToPSI.forEach(async (order, index) => {
          await postOrdersToPSI(order, index);
        });
      });
      bar.then((response) => {
        console.log(response);
      });
      page++;
    }
    // })().catch((err) => console.log(err));
  }
}

export { SendAllOrdersToPSIController };
