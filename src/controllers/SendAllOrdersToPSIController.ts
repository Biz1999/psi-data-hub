import { Pedido, PedidosBling } from "../dtos/OrdersBling";
import { Order, Product } from "../dtos/OrdersPSI";
import api from "../services/sendToPSI";
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
          payment_method:
            pedido.pedido.parcelas !== undefined
              ? pedido.pedido.parcelas[0].parcela?.forma_pagamento.descricao
              : null,
          total_discount: parseFloat(pedido.pedido.desconto),
          reference: "#123",
          products: pedido.pedido.itens?.map((item, index) => {
            const product = {
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

      // ordersToPSI.forEach(async (order, index) => {
      //   setTimeout(async function () {
      //     await api
      //       .post("/orders", order)
      //       .then((response) => console.log(response.status))
      //       .catch((error) => console.log(error.response.data));
      //   }, 3000 * (index + 1));
      // });

      fs.writeFileSync(
        `src/utils/orders.json`,
        JSON.stringify(ordersToPSI, null, 2)
      );

      // console.log(orders);
    } catch (error) {
      console.log(error);
    }
    // console.log(response);
  }
}

export { SendAllOrdersToPSIController };
