import { Pedido } from "../dtos/OrdersBling";
import { Order } from "../dtos/OrdersPSI";
import { format, parseISO } from "date-fns";
import { ListYesterdayOrdersController } from "./ListYesterdayOrdersController";
import { paymentMethod } from "../utils/paymentMethod";
import { postOrdersToPSI } from "../services/PostOrdersToPSI";
import { exit } from "process";

class SendYesterdayOrdersController {
  async handle(page: number) {
    try {
      const fs = require("fs");
      const listYesterdayOrdersController = new ListYesterdayOrdersController();
      const response = await listYesterdayOrdersController.handle(page);
      const orders = response.map((pedido: Pedido, index: number) => {
        let total_pedido = 0;
        let total_desconto = 0;
        return {
          products: pedido.pedido.itens?.map((item, index) => {
            let total =
              Number(item.item.quantidade) * Number(item.item.valorunidade);
            let total_discount =
              Number(item.item.descontoItem) * Number(item.item.quantidade);

            total_pedido += total;
            total_desconto += total_discount;
            const product = {
              sku: item.item.codigo,
              total_value: total,
              total_discount: total_discount,
              total_gross_profit:
                (Number(item.item.valorunidade) -
                  Number(item.item.precocusto)) *
                Number(item.item.quantidade),
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
          id: index,
          total_value: total_pedido,
          payment_method:
            pedido.pedido.parcelas !== undefined
              ? paymentMethod(
                  pedido.pedido.parcelas[0].parcela?.forma_pagamento.descricao
                )
              : "CASH",
          total_discount: total_desconto,
          store_slug: pedido.pedido.loja,
          update_stock: true,
          date: format(parseISO(pedido.pedido.data), "yyyy-MM-dd HH:mm:ss"),
          reference: pedido.pedido.numero,
        };
      }) as Order[];

      console.log("Página:", page);

      const ordersToPSI = orders.map((order) => {
        return Object.fromEntries(
          Object.entries(order).filter(([_, v]) => v != null)
        );
      });

      const promises = ordersToPSI.map(async (order, index) => {
        return await postOrdersToPSI(order, index);
      });

      await Promise.all(promises);

      fs.writeFileSync(
        `src/utils/orders.json`,
        JSON.stringify(ordersToPSI, null, 2)
      );
    } catch (error) {
      exit();
    }
  }
}

export { SendYesterdayOrdersController };
