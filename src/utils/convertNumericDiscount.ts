function convertNumericDiscount(
  totalprodutos: string,
  total_discount: number,
  total: number
) {
  const totalPercentage = total / Number(totalprodutos);

  return total_discount * totalPercentage;
}

export { convertNumericDiscount };
