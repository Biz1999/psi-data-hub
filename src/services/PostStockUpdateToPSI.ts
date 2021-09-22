import { Deposito } from "../dtos/ProductsPSI";
import api from "./sendToPSI";

async function PostStockUpdateToPSI(deposito: Deposito, index: number) {
  try {
    setTimeout(async () => {
      const { data } = await api.get(
        `/products/${deposito.product_sku}?stock_stores=${deposito.store_slug}`
      );
      const in_stock = Number(data.in_stock);

      if (deposito.quantity === in_stock) {
        await new Promise((r) => setTimeout(r, 1500 * (index + 1)));
        console.log(index, "igual", data, deposito);
        return;
      }
      if (deposito.quantity < in_stock) {
        await new Promise((r) => setTimeout(r, 1500 * (index + 1)));
        console.log(index, "menor", data, deposito);
        return;
      }

      deposito.quantity = Number(deposito.quantity) - in_stock;
      Promise.resolve(
        setTimeout(async function () {
          await api
            .post("/stock_updates", deposito)
            .then((response) =>
              console.log(
                index,
                response.status,
                "O que enviei:",
                deposito,
                "O que recebi para comparação:",
                data
              )
            )
            .catch((error) => console.log(index, error.response.data));
        }, 1500 * (index + 1))
      );
    }, 1500 * (index + 1));
  } catch (error) {
    console.log(index, error.response.data);
  }
}

export { PostStockUpdateToPSI };
