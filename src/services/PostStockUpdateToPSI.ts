import { Deposito } from "../dtos/ProductsPSI";
import api from "./sendToPSI";

async function PostStockUpdateToPSI(deposito: Deposito, index: number) {
  setTimeout(async function () {
    await api
      .post("/stock_updates", deposito)
      .then((response) => console.log(index, response.status))
      .catch((error) => console.log(index, error.response.data));
  }, 2000 * (index + 1));
}

export { PostStockUpdateToPSI };
