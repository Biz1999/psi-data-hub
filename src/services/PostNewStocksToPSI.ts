import { Deposito } from "../dtos/ProductsPSI";
import api from "./sendToPSI";

async function PostNewStocksToPSI(deposito: Deposito, index: number) {
  try {
    await new Promise((resolve, reject) => {
      setTimeout(async function () {
        await api
          .post("/stock_updates", deposito)
          .then((response) => console.log(index, response.status))
          .catch((error) => console.log(index, error.response.data));
        console.log(index, deposito);
      }, 1500 * (index + 1));
    });
  } catch (error) {
    console.log(index, error.response.data);
  }
}

export { PostNewStocksToPSI };
