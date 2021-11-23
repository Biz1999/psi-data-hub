function convertPercentage(percentage: string, total: number): number {
  const discount = parseFloat(
    (
      (Number(percentage.replace("%", "").replace(",", ".")) / 100) *
      total
    ).toFixed(4)
  );

  return discount;
}

export { convertPercentage };
