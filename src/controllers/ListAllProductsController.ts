import { ProductsBling, Produto } from "../dtos/ProductsBling";
import api from "../services/dataFromBling";

class ListAllProductsController {
  async handle(estoque = "S") {
    try {
      const apikey = process.env.API_KEY;
      const { data } = await api.get(
        `/produtos/json&apikey=${apikey}&estoque=${estoque}`
      );
      const { produtos } = data.retorno as ProductsBling;

      return produtos;
    } catch (err) {
      return err.message;
    }
  }
}

export { ListAllProductsController };
