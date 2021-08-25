import api from "./sendToPSI";
import { Order } from "../dtos/OrdersPSI";

async function postOrdersToPSI(order, index: number) {
  setTimeout(async function () {
    await api
      .post("/orders", order)
      .then((response) => console.log(response.status))
      .catch((error) => console.log(error.response.data));
  }, 1000 * (index + 1));
}

export { postOrdersToPSI };
