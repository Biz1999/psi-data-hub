import { Product, Deposito } from "../dtos/ProductsPSI";
import { Produto } from "../dtos/ProductsBling";
import api from "../services/sendToPSI";

import { ListAllProductsController } from "./ListAllProductsController";
import { PostStockUpdateToPSI } from "../services/PostStockUpdateToPSI";

class SendAllProductsToPSIController {
  async handle() {
    const fs = require("fs");
    const listAllProductsController = new ListAllProductsController();
    let page = 1;
    while (true) {
      try {
        const response = await listAllProductsController.handle("S", page);

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
            category: product.produto.categoria?.descricao,
            depositos: product.produto?.depositos?.map((deposito) => {
              if (
                deposito.deposito.desconsiderar === "N" &&
                deposito.deposito.id !== "7546975469"
              ) {
                const newDeposito = {
                  quantity: Number(deposito.deposito.saldo),
                  type: "in",
                  product_sku: product.produto.codigo,
                  unitary_value: Number(product.produto.preco),
                  cost_value: Number(product.produto.precoCusto),
                  store_slug: deposito.deposito.id,
                };
                return Object.fromEntries(
                  Object.entries(newDeposito).filter(([_, v]) => v !== "")
                );
              }
            }),
          };
        }) as Product[];

        // let depositosToPSI: Deposito[] = [];
        // products.map((product) => depositosToPSI.push(...product["depositos"]));

        // const depositosFiltered = depositosToPSI.filter((deposito) => {
        //   return deposito != null;
        // });

        // depositosFiltered.forEach(async (deposito, index) => {
        //   PostStockUpdateToPSI(deposito, index);
        // });

        const productsToPSI = products.map((product) => {
          delete product["depositos"];
          return Object.fromEntries(
            Object.entries(product).filter(([_, v]) => v !== "" && v != null)
          );
        });

        console.log(page);
        fs.writeFileSync(
          `src/utils/products.json`,
          JSON.stringify(productsToPSI, null, 2)
        );

        await api
          .post("/products", { products: productsToPSI })
          .then((response) => console.log(response.status))
          .catch((error) => {
            console.log(error.response.data);
          });

        // fs.writeFileSync(
        //   `src/utils/depositos.json`,
        //   JSON.stringify(depositosFiltered, null, 2)
        // );

        page++;
      } catch (error) {
        break;
      }
    }
  }
}

export { SendAllProductsToPSIController };
