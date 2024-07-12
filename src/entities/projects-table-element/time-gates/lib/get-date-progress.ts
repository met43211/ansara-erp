export const getDateProgress = (startDate: Date, endDate: Date) => {
  const start = startDate.getTime();
  const end = endDate.getTime();
  const current = new Date().getTime();

  if (current <= start) return 0;
  if (current >= end) return 100;

  const dif1 = current - start;
  const all = end - start;

  return Math.floor((dif1 * 100) / all);
};
