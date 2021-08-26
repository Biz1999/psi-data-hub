import { ProductsBling, Produto } from "../dtos/ProductsBling";
import api from "../services/dataFromBling";

class ListAllProductsController {
  async handle(estoque = "S", page: number) {
    try {
      const apikey = process.env.API_KEY;
      const { data } = await api
        .get(`/produtos/page=${page}/json&apikey=${apikey}&estoque=${estoque}`)
        .catch((err) => {
          throw new Error(err);
        });
      const { produtos } = data.retorno as ProductsBling;

      return produtos;
    } catch (err) {
      return err.message;
    }
  }
}

export { ListAllProductsController };
