import { PedidosBling } from "../dtos/OrdersBling";
import api from "../services/dataFromBling";
import { format, subDays } from "date-fns";

class ListYesterdayOrdersController {
  async handle(page: number) {
    try {
      const apikey = process.env.API_KEY;
      const yesterdayFormatted = format(subDays(new Date(), 2), "dd/MM/yyyy");
      const url = `pedidos/page=${page}/json%26apikey=${apikey}&filters=dataEmissao%5B${yesterdayFormatted}%20TO%20${yesterdayFormatted}%5D%26historico=true`;
      console.log(url);
      const { data } = await api.get(
        `pedidos/page=${page}/json%26apikey=${apikey}&filters=dataEmissao%5B${yesterdayFormatted}%20TO%20${yesterdayFormatted}%5D%26historico=true`
      );
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
