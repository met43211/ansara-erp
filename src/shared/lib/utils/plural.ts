export const plural = (n: number, variants: { one: string; some: string; many: string }) => {
  const lastNumber = Number(String(n).at(-1));

  if (lastNumber === 1) return variants.one;
  if (lastNumber > 1 && lastNumber < 5) return variants.some;

  return variants.many;
};
