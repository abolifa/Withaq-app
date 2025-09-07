import api from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string | null;
  from: number | null;
  last_page: number;
  last_page_url: string | null;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export function usePaginatedQuery<T>(
  key: string[],
  endpoint: string,
  params: Record<string, any> = {}
) {
  return useInfiniteQuery<PaginatedResponse<T>>({
    queryKey: [...key, params],
    queryFn: async ({ pageParam }) => {
      const res = await api.get(endpoint, {
        params: { ...params, page: pageParam },
      });
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1;
      }
      return undefined;
    },
  });
}
