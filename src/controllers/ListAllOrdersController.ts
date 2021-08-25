import { PedidosBling } from "../dtos/OrdersBling";
import api from "../services/dataFromBling";
import { format, subWeeks, subDays } from "date-fns";

class ListAllOrdersController {
  async handle(page: number) {
    try {
      const apikey = process.env.API_KEY;
      const yesterday = subDays(new Date(), 1);
      const yesterdayFormatted = format(subDays(new Date(), 1), "dd/MM/yyyy");
      const weeksFormatted = format(subWeeks(yesterday, 12), "dd/MM/yyyy");

      const { data } = await api.get(
        `pedidos/page=${page}/json%26apikey=${apikey}&filters=dataEmissao%5B${weeksFormatted}%20TO%20${yesterdayFormatted}%5D%26historico=true`
      );
      const { pedidos } = data.retorno as PedidosBling;

      return pedidos;
    } catch (err) {
      console.log(err.response.data);
    }
  }
}

export { ListAllOrdersController };
