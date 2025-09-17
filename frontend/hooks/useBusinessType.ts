import { useQuery } from '@tanstack/react-query';

const fetchBusinessTypeData = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/business_type`);
  return await response.json();
};

const useBusinessType = () => {
  return useQuery({
    queryKey: ['business-type'],
    queryFn: fetchBusinessTypeData,
  });
};

export { useBusinessType };
