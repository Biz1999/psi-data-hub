import { Product, Deposito } from "../dtos/ProductsPSI";
import { Produto } from "../dtos/ProductsBling";
import api from "../services/sendToPSI";
import { format } from "date-fns";

import { PostStockUpdateToPSI } from "../services/PostStockUpdateToPSI";
import { storeSlugConvert } from "../utils/storeSlugConvert";
import { ListYesterdayNewProductsController } from "./ListYesterdayNewProductsController";

class SendYesterdayNewProductsController {
  async handle(page: number) {
    const fs = require("fs");
    const listYesterdayNewProductsController =
      new ListYesterdayNewProductsController();
    try {
      const response = await listYesterdayNewProductsController.handle(
        "S",
        page
      );

      const products = response.map((product: Produto, index: number) => {
        return {
          name: product.produto.descricao,
          description: product.produto.descricao,
          brand: product.produto.marca,
          sku: product.produto.codigo,
          barcode: product.produto.gtin,
          value: Number(product.produto.preco),
          cost_value: Number(product.produto.precoCusto),
          category: product.produto.categoria?.descricao,
          depositos: product.produto?.depositos?.map((deposito) => {
            if (
              deposito.deposito.id !== "7546975469" &&
              deposito.deposito.id !== "7693996839" &&
              deposito.deposito.id !== "14886475479" &&
              deposito.deposito.id !== "14886480656"
            ) {
              const newDeposito = {
                quantity: Number(deposito.deposito.saldo),
                type: "in",
                product_sku: product.produto.codigo,
                unitary_value: Number(product.produto.preco),
                cost_value: Number(product.produto.precoCusto),
                store_slug: storeSlugConvert(deposito.deposito.id),
                date: format(
                  new Date(product.produto.dataAlteracao),
                  "yyyy-MM-dd 00:mm:ss"
                ),
              };
              return Object.fromEntries(
                Object.entries(newDeposito).filter(([_, v]) => v !== "")
              );
            }
          }),
        };
      }) as Product[];

      let depositosToPSI: Deposito[] = [];
      products.map((product) => depositosToPSI.push(...product["depositos"]));

      const depositosFiltered = depositosToPSI.filter((deposito) => {
        return deposito != null;
      });

      const productsToPSI = products.map((product) => {
        delete product["depositos"];
        return Object.fromEntries(
          Object.entries(product).filter(([_, v]) => v !== "" && v != null)
        );
      });

      console.log("Produtos: Página", page);

      await api
        .post("/products", { products: productsToPSI })
        .then((response) => console.log(response.status))
        .catch((error) => {
          console.log(error.response.data);
        });

      // await new Promise((f) => setTimeout(f, 2000));

      // const promises = depositosFiltered.map(async (deposito, index) => {
      //   PostStockUpdateToPSI(deposito, index);
      // });

      // fs.writeFileSync(
      //   `src/utils/depositos.json`,
      //   JSON.stringify(depositosFiltered, null, 2)
      // );

      fs.writeFileSync(
        `src/utils/products.json`,
        JSON.stringify(productsToPSI, null, 2)
      );

      return depositosFiltered;
    } catch (error) {
      throw new Error();
    }
  }
}

export { SendYesterdayNewProductsController };
