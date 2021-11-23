import { PedidosBling } from "../dtos/OrdersBling";
import api from "../services/dataFromBling";
import { format, subDays, subWeeks } from "date-fns";

class ListYesterdayOrdersController {
  async handle(page: number) {
    try {
      const apikey = process.env.API_KEY;
      const yesterday = subDays(new Date(), 1);
      const yesterdayFormatted = format(subDays(new Date(), 1), "dd/MM/yyyy");
      const weeksFormatted = format(subWeeks(yesterday, 12), "dd/MM/yyyy");
      const url = `pedidos/page=${page}/json%26apikey=${apikey}&filters=dataEmissao%5B${yesterdayFormatted}%20TO%20${yesterdayFormatted}%5D%26historico=true`;
      const { data } = await api.get(url);
      const { pedidos } = data.retorno as PedidosBling;

      return pedidos;
    } catch (err) {
      console.log(err.response.data);
    }
  }

  async ordersLength(page: number) {
    const pedidos = await this.handle(page);
    return pedidos.length;
  }
}

export { ListYesterdayOrdersController };
