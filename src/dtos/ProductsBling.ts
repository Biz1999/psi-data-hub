interface Deposito {
  deposito: {
    id: string;
    nome: string;
    saldo: number;
    desconsiderar: "S" | "N";
  };
}

export interface Produto {
  produto: {
    codigo: string;
    descricao: string;
    marca: string;
    gtin: string;
    preco: string;
    precoCusto: string;
    categoria: {
      id: string;
      descricao: string;
    };
    estoqueAtual: number;
    depositos: Deposito[];
  };
}

export interface ProductsBling {
  produtos: Produto[];
}
