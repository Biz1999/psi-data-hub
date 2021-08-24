import { Pedido } from "../dtos/OrdersBling";
import { Order, Product } from "../dtos/OrdersPSI";
import { ListAllOrdersController } from "./ListAllOrdersController";

class SendAllOrdersToPSIController {
  async handle() {
    try {
      const fs = require("fs");
      const listAllOrdersController = new ListAllOrdersController();
      const response = await listAllOrdersController.handle();
      const orders = response.map((pedido: Pedido, index: number) => {
        return {
          id: index,
          total_value: Number(pedido.pedido.totalvenda),
          total_discount: parseFloat(pedido.pedido.desconto),
          payment_method:
            pedido.pedido.parcelas !== undefined
              ? pedido.pedido.parcelas[0].parcela?.forma_pagamento.descricao
              : null,
          products: pedido.pedido.itens?.map((item, index) => {
            const product = {
              product_id: index,
              product_sku: item.item.codigo,
              total_value:
                Number(item.item.quantidade) * Number(item.item.valorunidade),
              total_discount:
                Number(item.item.descontoItem) * Number(item.item.quantidade),
              total_gross_profit:
                Number(item.item.precocusto) * Number(item.item.quantidade) ===
                0
                  ? null
                  : Number(item.item.precocusto) * Number(item.item.quantidade),
              unitary_value: Number(item.item.valorunidade),
              unitary_cost_value:
                Number(item.item.precocusto) === 0
                  ? null
                  : Number(item.item.precocusto),
              unitary_gross_profit:
                Number(item.item.precocusto) === 0
                  ? null
                  : Number(item.item.valorunidade) -
                    Number(item.item.precocusto),
              quantity: Number(item.item.quantidade),
            };
            return product;
          }),
        };
      }) as Order[];

      const ordersWithoutNull = orders.map((order) => {
        return Object.fromEntries(
          Object.entries(order).filter(([_, v]) => v != null)
        );
      });

      fs.writeFileSync(
        `orders.json`,
        JSON.stringify(ordersWithoutNull, null, 2)
      );

      // console.log(orders);
    } catch (error) {
      console.log(error);
    }
    // console.log(response);
  }
}

export { SendAllOrdersToPSIController };
