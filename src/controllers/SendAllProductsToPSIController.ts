import { Product, Deposito } from "../dtos/ProductsPSI";
import { Produto } from "../dtos/ProductsBling";
import api from "../services/sendToPSI";

import { ListAllProductsController } from "./ListAllProductsController";

class SendAllProductsToPSIController {
  async handle() {
    const listAllProductsController = new ListAllProductsController();
    const response = await listAllProductsController.handle("S");
    const products = response.map((product: Produto) => {
      return {
        name: product.produto.descricao,
        description: product.produto.descricao,
        brand: product.produto.marca,
        sku: product.produto.codigo,
        barcode: product.produto.gtin,
        value: Number(product.produto.preco),
        cost_value: Number(product.produto.precoCusto),
        in_stock: product.produto.estoqueAtual,
        category: product.produto.categoria.descricao,
        depositos: product.produto.depositos.map((deposito) => {
          const newDeposito = {
            quantity: Number(deposito.deposito.saldo),
            type: "in",
            product_sku: product.produto.codigo,
            unitary_value: Number(product.produto.preco),
            cost_value: Number(product.produto.precoCusto),
            store_slug: deposito.deposito.id,
          };
          return newDeposito;
        }),
      };
    }) as Product[];

    let depositosToPSI: Deposito[] = [];
    products.map((product) => depositosToPSI.push(...product["depositos"]));

    console.log(JSON.stringify(depositosToPSI[11], null, 2));
    depositosToPSI.forEach(async (deposito, index) => {
      setTimeout(async function () {
        await api
          .post("/stock_updates", deposito)
          .then((response) => console.log(response.status))
          .catch((error) => console.log(error.response.data));
      }, 3000 * (index + 1));
    });

    // const productsToPSI = products.map((product) => {
    //   delete product["depositos"];
    //   return Object.fromEntries(
    //     Object.entries(product).filter(([_, v]) => v !== "")
    //   );
    // });
    // console.log(JSON.stringify(productsToPSI, null, 2));
    // await api
    //   .post("/products", { products: productsToPSI })
    //   .then((response) => console.log(response.status))
    //   .catch((error) => console.log(error.response.data));
  }
}

export { SendAllProductsToPSIController };
