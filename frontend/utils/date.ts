export const calculateDayDiff = (startDate: string | null, endDate: string | null): number => {
  if (startDate && endDate) {
    const from: number = new Date(startDate).getTime();
    const end: number = new Date(endDate).getTime();
    const diffDays = Math.ceil((end - from) / (24 * 1000 * 3600));
    return diffDays - 1;
  }
  return 0;
};

export const calculatePlannedRate = (startDate: string | null, endDate: string | null): number =>
  Math.ceil((calculateDayDiff(startDate, Date()) / calculateDayDiff(startDate, endDate)) * 100);
