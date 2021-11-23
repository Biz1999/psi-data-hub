import { Pedido } from "../dtos/OrdersBling";
import { Order } from "../dtos/OrdersPSI";
import { format, parseISO } from "date-fns";
import { ListYesterdayOrdersController } from "./ListYesterdayOrdersController";
import { paymentMethod } from "../utils/paymentMethod";
import { postOrdersToPSI } from "../services/PostOrdersToPSI";
import { exit } from "process";
import { convertPercentage } from "../utils/convertPercentage";
import { convertNumericDiscount } from "../utils/convertNumericDiscount";

class SendYesterdayOrdersController {
  async handle(page: number) {
    try {
      const fs = require("fs");
      const listYesterdayOrdersController = new ListYesterdayOrdersController();
      const response = await listYesterdayOrdersController.handle(page);
      const orders = response.map((pedido: Pedido, index: number) => {
        return {
          id: index,
          total_value: Number(pedido.pedido.totalprodutos),
          payment_method:
            pedido.pedido.parcelas !== undefined
              ? paymentMethod(
                  pedido.pedido.parcelas[0].parcela?.forma_pagamento.descricao
                )
              : "CASH",
          // total_discount: 0,
          total_discount: pedido.pedido.desconto.includes("%")
            ? convertPercentage(
                pedido.pedido.desconto,
                Number(pedido.pedido.totalprodutos.replace(",", "."))
              )
            : parseFloat(
                Number(pedido.pedido.desconto.replace(",", ".")).toFixed(4)
              ),
          store_slug: pedido.pedido.loja,
          update_stock: true,
          date: format(parseISO(pedido.pedido.data), "yyyy-MM-dd HH:mm:ss"),
          reference: pedido.pedido.numero,
          products: pedido.pedido.itens?.map((item, index) => {
            let total =
              Number(item.item.quantidade) * Number(item.item.valorunidade);
            let total_discount = pedido.pedido.desconto.includes("%")
              ? convertPercentage(pedido.pedido.desconto, total)
              : Number(pedido.pedido.desconto.replace(",", ".")) !== 0
              ? convertNumericDiscount(
                  pedido.pedido.totalprodutos,
                  Number(pedido.pedido.desconto.replace(",", ".")),
                  total
                )
              : 0;

            let unitary_gross_profit =
              Number(item.item.valorunidade) -
              Number(item.item.precocusto) -
              total_discount / Number(item.item.quantidade);
            const product = {
              sku: item.item.codigo,
              total_value: total,
              total_discount: total_discount,
              total_gross_profit:
                unitary_gross_profit * Number(item.item.quantidade),
              unitary_value: Number(item.item.valorunidade),
              unitary_cost_value: Number(item.item.precocusto),
              unitary_gross_profit,
              quantity: Number(item.item.quantidade),
            };
            return Object.fromEntries(
              Object.entries(product).filter(([_, v]) => v != null && v !== "")
            );
          }),
        };
      }) as Order[];

      console.log("Order: Página", page);
      const ordersToPSI = orders.map((order) => {
        return Object.fromEntries(
          Object.entries(order).filter(([_, v]) => v != null)
        );
      });

      return ordersToPSI;
    } catch (error) {
      // exit(1);
      throw new Error();
    }
  }
}

export { SendYesterdayOrdersController };
