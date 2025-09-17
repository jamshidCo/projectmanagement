import { useQuery } from '@tanstack/react-query';

type SalesRevenueResponse = Record<string, number>;

const fetchSalesRevenue = async (): Promise<SalesRevenueResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/sales_revenue`);
  return await response.json();
};

export const useSalesRevenue = () =>
  useQuery({
    queryKey: ['sales-revenue'],
    queryFn: fetchSalesRevenue,
  });
