import useSWR from "swr";

export const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useQuery = (url) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    url,
    fetcher,
    {
      keepPreviousData: true,
      suspense: true,
    }
  );

  return { data, isLoading, error, isValidating, mutate };
};

export default useQuery;
