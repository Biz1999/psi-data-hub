export const paymentMethod = (method: string) => {
  if (method === "Dinheiro") return "CASH";
  else if (method === "Cartao de Debito") return "DEBIT_CARD";
  else if (method === "Cartao de Credito") return "CREDIT_CARD";

  return "CASH";
};
