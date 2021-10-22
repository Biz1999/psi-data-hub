import { ProductsBling } from "../dtos/ProductsBling";
import api from "../services/dataFromBling";
import { format, subDays } from "date-fns";

class ListYesterdayNewProductsController {
  async handle(estoque = "S", page: number) {
    try {
      const apikey = process.env.API_KEY;
      const yesterdayFormatted = format(subDays(new Date(), 1), "dd/MM/yyyy");
      const encoded = encodeURI(
        `/produtos/page=${page}/json&apikey=${apikey}&estoque=${estoque}&filters=dataInclusao[${"01/09/2021"} TO ${yesterdayFormatted}]`
      );
      const { data } = await api.get(encoded).catch((err) => {
        throw new Error(err);
      });
      const { produtos } = data.retorno as ProductsBling;

      return produtos;
    } catch (err) {
      return err.message;
    }
  }
}

export { ListYesterdayNewProductsController };
