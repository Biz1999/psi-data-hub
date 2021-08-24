import { PedidosBling } from "../dtos/OrdersBling";
import api from "../services/dataFromBling";

class ListAllOrdersController {
  async handle() {
    try {
      const apikey = process.env.API_KEY;
      const { data } = await api.get(
        `/pedidos/json&apikey=${apikey}&historico=true`
      );
      const { pedidos } = data.retorno as PedidosBling;

      return pedidos;
    } catch (err) {
      return err.response.data;
    }
  }
}

export { ListAllOrdersController };
