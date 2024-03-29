interface Item {
  item: {
    codigo: string;
    quantidade: string;
    valorunidade: string;
    precocusto: string;
    descontoItem: string;
  };
}

export interface Pedido {
  pedido: {
    numero: string;
    totalvenda: string;
    totalprodutos: string;
    desconto: string;
    data: string;
    loja: string;
    situacao: string;
    parcelas?: {
      parcela: {
        forma_pagamento: {
          id: string;
          descricao: string;
        };
      };
    }[];
    itens: Item[];
  };
}

export interface PedidosBling {
  pedidos: Pedido[];
}
