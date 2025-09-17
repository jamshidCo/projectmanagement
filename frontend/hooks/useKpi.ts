import { useQuery } from '@tanstack/react-query';

type KpiResponse = {
    totalAmount: number;
};

const fetchKpi = async (year: number): Promise<KpiResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/kpi/${year}`);
    return await response.json();
};

export const useKpi = (year: number) =>
    useQuery({
        queryKey: ['kpi', year],
        queryFn: () => fetchKpi(year),
    });
