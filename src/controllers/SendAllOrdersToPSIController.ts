import { Pedido } from "../dtos/OrdersBling";
import { Order } from "../dtos/OrdersPSI";
import api from "../services/sendToPSI";
import { format, parseISO } from "date-fns";
import { ListAllOrdersController } from "./ListAllOrdersController";
import { paymentMethod } from "../utils/paymentMethod";
import { storeSlugConvert } from "../utils/storeSlugConvert";
import { postOrdersToPSI } from "../services/PostOrdersToPSI";

class SendAllOrdersToPSIController {
  async handle(page: number) {
    const fs = require("fs");
    const listAllOrdersController = new ListAllOrdersController();
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
        store_slug: pedido.pedido.loja,
        date: format(parseISO(pedido.pedido.data), "yyyy-MM-dd HH:mm:ss"),
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

    console.log("Página:", page);

    const ordersToPSI = orders.map((order) => {
      return Object.fromEntries(
        Object.entries(order).filter(([_, v]) => v != null)
      );
    });

    // ordersToPSI.forEach(async (order, index) => {
    //   postOrdersToPSI(order, index);
    // });

    // const promises = ordersToPSI.map(async (order, index) => {
    //   return await postOrdersToPSI(order, index);
    // });

    // await Promise.all(promises);

    fs.writeFileSync(
      `src/utils/orders.json`,
      JSON.stringify(ordersToPSI, null, 2)
    );
  }
}

export { SendAllOrdersToPSIController };
