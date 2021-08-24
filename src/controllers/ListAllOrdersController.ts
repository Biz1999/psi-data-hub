import { PedidosBling } from "../dtos/OrdersBling";
import api from "../services/dataFromBling";

class ListAllOrdersController {
  async handle() {
    try {
      const apikey = process.env.API_KEY;
      const { data } = await api.get(
        `pedidos/json%26apikey=${apikey}&filters=dataEmissao%5B31/05/2021%20TO%2023/08/2021%5D%26historico=true`
      );
      const { pedidos } = data.retorno as PedidosBling;

      return pedidos;
    } catch (err) {
      console.log(err.response.data);
    }
  }
}

export { ListAllOrdersController };
